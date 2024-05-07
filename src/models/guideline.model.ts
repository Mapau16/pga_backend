import { Schema, model, Document } from 'mongoose';

export interface Guideline extends Document {
    name: string;
    enabled: boolean;
}

const GuidelineSchema = new Schema<Guideline>({
    name: { type: String, required: true },
    enabled: { type: Boolean, required: true },
}, {
    timestamps: true,
    versionKey: false,
    collection: 'guideline'
});

export default model<Guideline>('Guideline', GuidelineSchema);