import { Schema, model, Document } from 'mongoose';

export interface Process extends Document {
    name: string;
    enabled: boolean;
}

const ProcessSchema = new Schema<Process>({
    name: { type: String, required: true },
    enabled: { type: Boolean, required: true },
}, {
    timestamps: true,
    versionKey: false,
    collection: 'process'
});

export default model<Process>('Process', ProcessSchema);