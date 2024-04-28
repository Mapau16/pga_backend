import { Schema, model, Document } from 'mongoose';

export interface Client extends Document {
    name: string;
}

const ClientSchema = new Schema<Client>({
    name: { type: String, required: true },
}, {
    timestamps: true,
    versionKey: false,
    collection: 'client'
});

export default model<Client>('Client', ClientSchema);