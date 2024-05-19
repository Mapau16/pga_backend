import mongoose from "mongoose";
import CriterioSchema, { Criterio } from "../../models/criterio.model";

interface ICriterioRepository {
    saveCriterio(criterio: Criterio): Promise<Criterio>,
}

export class CriterioRepository implements ICriterioRepository {
    
    async saveCriterio(criterio: Criterio): Promise<Criterio> {
        const newCriterio = await CriterioSchema.create(criterio);
       return newCriterio;
    }

    async findAllCriterios(): Promise<Criterio[]> {
        const criterios = await CriterioSchema.aggregate([
            {
                $project: {
                    items: 0
                }
            }
        ]);
       return criterios;
    }

    async findCriterioById(idcriterio: string): Promise<Criterio> {
        const criterio = await CriterioSchema.aggregate([
            {
                $match: {
                    _id: new mongoose.Types.ObjectId(idcriterio)
                }
            },
            {
                $unwind: "$items"
            },
            {
                $lookup: {
                    from: "guideline",
                    localField: "items.guideline",
                    foreignField: "_id",
                    as: "items.guideline"
                }
            },
            {
                $lookup: {
                    from: "process",
                    localField: "items.process",
                    foreignField: "_id",
                    as: "items.process"
                }
            },
            {
                $lookup: {
                    from: "question",
                    localField: "items.question",
                    foreignField: "_id",
                    as: "items.question"
                }
            },
            {
                $unwind: "$items.guideline"
            },
            {
                $unwind: "$items.process"
            },
            {
                $unwind: "$items.question"
            },
            {
                $project: {
                    "items.guideline.createdAt": 0,
                    "items.guideline.updatedAt": 0,
                    "items.process.createdAt": 0,
                    "items.process.updatedAt": 0,
                    "items.question.createdAt": 0,
                    "items.question.updatedAt": 0,
                }
            },
            {
                $group: {
                    _id: "$_id",
                    name: { $first: "$name" },
                    enabled: { $first: "$enabled" },
                    items: { $push: "$items" },
                    createdAt: { $first: "$createdAt" },
                    updatedAt: { $first: "$updatedAt" }
                }
            }
        ]).option({ allowDiskUse: true });

       return criterio[0];
    }
}