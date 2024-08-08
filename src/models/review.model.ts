import { Schema, model, Document } from 'mongoose';
import CriterioShema, { Criterio} from './criterio.model';

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
    role: String
    date: Date;
    criterio: Criterio;
}

const CycleSchema = new Schema<Cycle>({
    _id: { type: Schema.Types.Mixed, default: null },
    name: { type: String, required: true },
    worker: { type: String, required: true },
    role: { type: String, required: true },
    date: { type: Date, required: true },
    criterio: { type: CriterioShema.schema, required: true },
});

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
