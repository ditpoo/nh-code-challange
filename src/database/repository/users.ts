import UsersModel, { IUsers } from '../models/users';

export default class UsersRepo {
    static async create(item: IUsers): Promise<IUsers | null> {
        return (await UsersModel.create(item)).toObject();
    }

    static async findById(id: string): Promise<IUsers | null> {
        return UsersModel.findOne({ _id: id }).lean<IUsers>().exec();
    }

    static async findByFingerprint(fingerprint: string): Promise<IUsers | null> {
        return UsersModel.findOne({ fingerprint }).lean<IUsers>().exec();
    }
}
