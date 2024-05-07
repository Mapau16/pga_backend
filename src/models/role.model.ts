import { Schema, model, Document } from 'mongoose';

export interface Role extends Document {
    name: string;
    enabled: boolean;
}

const RoleSchema = new Schema<Role>({
    name: { type: String, required: true },
    enabled: { type: Boolean, required: true },
}, {
    timestamps: true,
    versionKey: false,
    collection: 'role'
});

export default model<Role>('Role', RoleSchema);