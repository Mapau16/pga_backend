import mongoose from "mongoose";
import GuidelineSchema, { Guideline } from "../../models/guideline.model";

interface IGuidelineRepository {
    saveGuideline(guideline: Guideline): Promise<Guideline>,
    updateGuideline(id: string, guideline: Guideline): Promise<Guideline>,
    findGuidelineByName(name: string): Promise<Guideline[]>,
}

export class GuidelineRepository implements IGuidelineRepository {
    
    async saveGuideline(guideline: Guideline): Promise<Guideline> {
        const newGuideline = await GuidelineSchema.create(guideline);
       return newGuideline;
    }

    async updateGuideline(id: string, guideline: Guideline): Promise<Guideline> {
       const updateGuideline = await GuidelineSchema.findOneAndUpdate({_id: new mongoose.Types.ObjectId(id)}, guideline, { upsert: true, new: true })
       return updateGuideline;
    }

    async findGuidelineByName(name: string): Promise<Guideline[]> {
        const guideline = await GuidelineSchema.find({ "name" : { $regex: name, $options: 'i' }})
        return guideline!;
    }

    async findAllGuidelines(): Promise<Guideline[]> {
        const guideline = await GuidelineSchema.find({});
        return guideline!;
    }
}