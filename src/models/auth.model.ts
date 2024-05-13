import mongoose, { Schema, model, Document } from 'mongoose';
import { User } from './user.model';

export interface IAuth {
    user?: User;
    token?: string;
    error?: { message: string };
}

export interface Auth extends Document {
    token: string;
    refresh_token?: string;
    user: User;
}

const AuthSchema = new Schema<Auth>({
    token: { type: String, required: true },
    refresh_token: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, {
    timestamps: true,
    versionKey: false,
    collection: 'auth'
});

export default model<Auth>('Auth', AuthSchema);