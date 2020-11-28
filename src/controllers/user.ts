import { Response } from 'express';
import UserRepo from '../database/repository/users';
import { ApiResponse } from '../helpers/apiResponse';
import { ApiError, BadRequestError } from '../helpers/apiError';
import { IUsers } from '../database/models/users';
import jwt from 'jsonwebtoken';
import { RequestWithUser } from '../middlewares/authMiddleware';
import * as bcrypt from 'bcrypt';

interface IResponse extends IUsers {
    token: string;
}

export async function create(req: RequestWithUser, res: Response): Promise<any> {
    if (req?.user?._id) {
        return new ApiResponse<IUsers>(200, 'Sucessfully Retrived user', true, req.user).send(res);
    }

    const { fingerprint } = req.body;
    const userProperties: IUsers = { role: 'guest', isAnonymous: true };

    if (fingerprint) {
        const retrivedUser = await UserRepo.findByFingerprint(fingerprint);

        if (retrivedUser) {
            return new ApiResponse<IUsers>(200, 'Sucessfully Retrived user', true, retrivedUser).send(res);
        }

        userProperties['fingerprint'] = fingerprint;
    }

    const createdUser = await UserRepo.create(userProperties);

    if (!createdUser) {
        throw new ApiError(500, 'Failed to create User');
    }

    const secret = process.env.JWT_SECRET || 'nb-secret';
    const expiresIn = process.env.JWT_EXPIRY_TIME || 60 * 60 * 24; // day
    const dataStoredInToken = { _id: createdUser._id };
    const token = jwt.sign(dataStoredInToken, secret, { expiresIn });

    return new ApiResponse<IResponse>(200, 'Sucessfully created user', true, {
        ...createdUser,
        token,
    }).send(res);
}

export async function signup(req: RequestWithUser, res: Response): Promise<any> {
    const { email, password, fingerprint } = req.body;

    if (!email || !password) {
        throw new BadRequestError('Invalid Email Or Password');
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = await bcrypt.hash(password, salt);

    if (req?.user?._id) {
        const updatedUser = await UserRepo.update(req.user._id, {
            email,
            password: hash,
            role: 'user',
            isAnonymous: false,
        });

        if (!updatedUser) {
            throw new ApiError(500, 'Failed to Update User');
        }

        return new ApiResponse<IUsers>(200, 'Sucessfully Updated User', true, updatedUser).send(res);
    }

    const userProperties: IUsers = { email, password: hash, role: 'user', isAnonymous: false };

    if (fingerprint) {
        const retrivedUser = await UserRepo.findByFingerprint(fingerprint);

        if (retrivedUser?._id) {
            const updatedUser = await UserRepo.update(retrivedUser._id, { email, password: hash });

            if (!updatedUser) {
                throw new ApiError(500, 'Failed to Update User');
            }

            return new ApiResponse<IUsers>(200, 'Sucessfully Updated User', true, updatedUser).send(res);
        }

        userProperties['fingerprint'] = fingerprint;
    }

    const createdUser = await UserRepo.create(userProperties);

    if (!createdUser) {
        throw new ApiError(500, 'Failed to create User');
    }

    return new ApiResponse<IUsers>(200, 'Sucessfully created user', true, createdUser).send(res);
}
