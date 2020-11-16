import { Response } from 'express';
import UserRepo from '../database/repository/users';
import { ApiResponse } from '../core/apiResponse';
import { ApiError } from '../core/apiError';
import { IUsers } from '../database/models/users';
import jwt from 'jsonwebtoken';
import { RequestWithUser } from '../middleware/authMiddleware';

type IResponse = Partial<IUsers> & { token: string };

export async function create(req: RequestWithUser, res: Response): Promise<any> {
    const authorization = req.headers.authorization;
    const secret = process.env.JWT_SECRET || 'nb-secret';

    if (authorization) {
        const [Bearer, token] = authorization.split(' ');
        const decoded = jwt.verify(token, secret) as { _id: string };

        if (Bearer === 'Bearer' && decoded?._id) {
            const retrivedUser = await UserRepo.findById(decoded._id);

            if (retrivedUser) {
                return new ApiResponse<Partial<IUsers>>(200, 'Sucessfully retrived user', true, retrivedUser).send(res);
            }
        }
    }

    const createdUser = await UserRepo.create({ role: 'guest', isAnonymous: true } as IUsers);

    if (!createdUser) {
        throw new ApiError(500, 'Failed to create User');
    }

    const expiresIn = process.env.JWT_EXPIRY_TIME || 60 * 60 * 24; // day
    const dataStoredInToken = { _id: createdUser._id };
    const token = jwt.sign(dataStoredInToken, secret, { expiresIn });

    return new ApiResponse<IResponse>(200, 'Sucessfully created user', true, {
        ...createdUser,
        token,
    }).send(res);
}
