import { Schema, model, Document } from 'mongoose';

export interface Question extends Document {
    name: string;
    enabled: boolean;
}

const QuestionSchema = new Schema<Question>({
    name: { type: String, required: true },
    enabled: { type: Boolean, required: true },
}, {
    timestamps: true,
    versionKey: false,
    collection: 'question'
});

export default model<Question>('Question', QuestionSchema);