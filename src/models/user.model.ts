import mongoose, { Schema, model, Document, ObjectId } from 'mongoose';
import ClientSchema, { Client } from './client.model';

export interface User extends Document {
    _id?: ObjectId;
    email: string;
    username: string;
    password: string;
    verified: boolean;
    clients: Client[];
}

const UserSchema = new Schema<User>({
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    verified: { type: Boolean, required: false },
    clients: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Client' }],
}, {
    timestamps: true,
    versionKey: false,
    collection: 'user'
});

export default model<User>('User', UserSchema);