import mongoose, { Schema, model } from "mongoose";
import guidelineModel, { Guideline } from "./guideline.model";
import processModel, { Process } from "./process.model";
import questionModel, { Question } from "./question.model";

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
    items: Item[]
}

const CriterioSchema = new Schema<Criterio>({ 
    name: { type: String, required: true, },
    items: [
        {
            guideline: { type: mongoose.Schema.Types.ObjectId, ref: 'Guideline' },
            process: { type: mongoose.Schema.Types.ObjectId, ref: 'Process' },
            question: { type: mongoose.Schema.Types.ObjectId, ref: 'Question' },
            observation: { type: String, required: false },
            status: { type: Boolean, required: true },
        }
    ]
}, {
    timestamps: true,
    versionKey: false,
    collection: 'Criterio'
});

export default model<Criterio>('Criterio', CriterioSchema);