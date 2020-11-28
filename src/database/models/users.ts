import { Document, model, Schema } from 'mongoose';

export interface IUsers {
    _id?: string;
    name?: string;
    email?: string;
    password?: string;
    fingerprint?: string;
    isAnonymous: boolean;
    role: 'guest' | 'admin' | 'user';
    data?: any;
}

const schema = new Schema(
    {
        name: {
            type: String,
        },
        email: {
            type: String,
        },
        password: {
            type: String,
        },
        fingerprint: {
            type: String,
        },
        isAnonymous: {
            type: Boolean,
            required: true,
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

const UsersModel = model<IUsers & Document>('User', schema, 'users');

export default UsersModel;
