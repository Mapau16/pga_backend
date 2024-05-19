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
}