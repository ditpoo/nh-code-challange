import { Document, model, Schema } from 'mongoose';

export interface IUsers extends Document {
    name?: string;
    isAnonymous: boolean;
    role: 'guest' | 'admin' | 'user';
    data?: any;
}

const schema = new Schema(
    {
        name: {
            type: String,
        },
        isAnonymous: {
            type: Boolean,
            default: false,
        },
        role: {
            type: String,
            enum: ['guest', 'admin', 'user'],
            required: true,
            default: 'guest',
        },
        data: {
            type: Schema.Types.Mixed,
        },
    },
    { timestamps: { createdAt: true, updatedAt: false } },
);

const UsersModel = model<IUsers>('User', schema, 'users');

export default UsersModel;
