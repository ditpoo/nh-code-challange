import { Response } from 'express';
import UserRepo from '../database/repository/users';
import { ApiResponse } from '../helpers/apiResponse';
import { ApiError } from '../helpers/apiError';
import { IUsers } from '../database/models/users';
import jwt from 'jsonwebtoken';
import { RequestWithUser } from '../middlewares/authMiddleware';

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
