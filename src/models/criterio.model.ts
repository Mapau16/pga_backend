import mongoose, { Schema, model } from "mongoose";
import { Guideline } from "./guideline.model";
import { Process } from "./process.model";
import { Question } from "./question.model";

export interface Criterio extends Document {
    guidelines: Guideline;
    processes: Process;
    questions: Question;
    observation: string;
    enabled: boolean;
}

const CriterioSchema = new Schema<Criterio>({   
    guidelines: { type: mongoose.Schema.Types.ObjectId, ref: 'Guideline' },
    processes: { type: mongoose.Schema.Types.ObjectId, ref: 'Process' },
    questions: { type: mongoose.Schema.Types.ObjectId, ref: 'Question' },
    observation: { type: String, required: false },
    enabled: { type: Boolean, required: true },
});

export default model<Criterio>('Criterio', CriterioSchema);