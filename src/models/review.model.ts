import { Schema, model, Document } from 'mongoose';
import CriterioSchema, { Criterio} from './criterio.model';

enum Status {
    NO_CUMPLE = 'NO CUMPLE',
    CUMPLE = 'CUMPLE'
}


export interface Review extends Document {
    name: string;
    client: string;
    date: Date;
    cycle: Cycle;
}

export interface Cycle extends Document {
    _id?: String;
    name: string;
    worker: string;
    role: String;
    date: Date;
    criterio: Criterio;
}

interface Items {
    guideline: string;
    process:  string;
    question: string;
    observation?: string;
    status: Status;
}

export interface CriterioReview extends Document {
    name: string;
    enabled: boolean;
    items: Items[]
}

//const CriterioSchemaNoTimestamps = new Schema(CriterioSchema.schema.obj, { _id: false, timestamps: false });

const CriterioReviewSchema = new Schema<CriterioReview>({
    name: { type: String, required: true, },
    enabled: { type: Boolean, required: true, },
    items: [{
        guideline: { type: String, required: true },
        process:  { type: String, required: true },
        question: { type: String, required: true },
        observation:  { type: String },
        status: { type: String, enum: Object.values(Status), default: Status.NO_CUMPLE },
}]
}, { _id: false });

const CycleSchema = new Schema<Cycle>({
    name: { type: String, required: true },
    worker: { type: String, required: true },
    role: { type: String, required: true },
    date: { type: Date, required: true },
    criterio: CriterioReviewSchema
}, { _id: false });

const ReviewSchema = new Schema<Review>({
    name: { type: String, required: true },
    client: { type: String, required: true },
    date: { type: Date, required: true },
    cycle: { type: CycleSchema, required:true },

}, {
    timestamps: true,
    versionKey: false,
    collection: 'review'
});

export default model<Review>('Review', ReviewSchema);
