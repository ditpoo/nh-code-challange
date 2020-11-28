import type { Request, Response, NextFunction } from 'express';
import type { IUsers } from '../database/models/users';
import UserRepo from '../database/repository/users';
import jwt from 'jsonwebtoken';

export interface RequestWithUser extends Request {
    user?: IUsers;
}

export default async function authMiddleware(
    request: RequestWithUser,
    response: Response,
    next: NextFunction,
): Promise<void> {
    const authorization = request.headers.authorization;
    const secret = process.env.JWT_SECRET || 'nb-secret';

    if (authorization) {
        const [Bearer, token] = authorization.split(' ');
        const decoded = jwt.verify(token, secret) as { _id: string };

        if (Bearer === 'Bearer' && decoded?._id) {
            const retrivedUser = await UserRepo.findById(decoded._id);

            if (retrivedUser?._id) {
                request.user = retrivedUser;
            }
        }
    }

    next();
}
