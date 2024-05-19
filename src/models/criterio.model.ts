import mongoose, { Schema, model } from "mongoose";
import { Guideline } from "./guideline.model";
import { Process } from "./process.model";
import { Question } from "./question.model";

enum Status {
    NA = 'NA',
    APLICA = 'APLICA'
}

export interface Item {
    guideline: Guideline;
    process: Process;
    question: Question;
    observation: string;
    status: Status;
}

export interface Criterio extends Document {
    name: string;
    enabled: boolean;
    items: Item[]
}

const CriterioSchema = new Schema<Criterio>({ 
    name: { type: String, required: true, },
    enabled: { type: Boolean, required: true, },
    items: [
        {
            _id: false,
            guideline: { type: mongoose.Schema.Types.ObjectId, ref: 'Guideline' },
            process: { type: mongoose.Schema.Types.ObjectId, ref: 'Process' },
            question: { type: mongoose.Schema.Types.ObjectId, ref: 'Question' },
            observation: { type: String, required: false },
            status: { type: String, default: 'NA', enum: ['NA', 'APLICA'] },
        }
    ]
}, {
    timestamps: true,
    versionKey: false,
    collection: 'criterio'
});

export default model<Criterio>('Criterio', CriterioSchema);