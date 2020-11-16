import UsersModel, { IUsers } from '../models/users';
import { Types } from 'mongoose';
import { ApiError } from '../../core/apiError';

export default class UsersRepo {
    static async create(item: IUsers): Promise<IUsers | null> {
        const createdUser = await UsersModel.create(item);

        if (!createdUser) {
            throw new ApiError(500, 'Failed to Create User');
        }

        return createdUser.toObject();
    }

    static async findById(id: Types.ObjectId): Promise<IUsers | null> {
        return UsersModel.findOne({ _id: id }).lean<IUsers>().exec();
    }
}
