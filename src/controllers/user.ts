import { Request, Response } from 'express';
import UserRepo from '../database/repository/users';
import { ApiResponse } from '../core/apiResponse';
import { IUsers } from '../database/models/users';

export async function create(req: Request, res: Response): Promise<void> {
    const createdUser = await UserRepo.create({ role: 'guest' } as IUsers);

    if (!createdUser) {
        res.status(404).send({ msg: 'Failed to Create a User' });
    }

    new ApiResponse<typeof createdUser>(200, 'Sucessfully created user', true, createdUser).send(res);
}
