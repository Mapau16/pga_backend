import { JwtAdapter } from "../config/jwt.adapter";
import { bcriptAdapter } from "../config/bcript.adapter";
import { errorResponse } from "../config/error.adapter";

import { GuidelineRepository } from "../infraestructure/repositories/guideline";

import { User } from "../models/user.model";
import { IAuth } from "../models/auth.model";
import { Client } from "../models/client.model";
import { Question } from "../models/question.model";
import { Guideline } from "../models/guideline.model";

class GuidelineService {

    private _guidelineRepository: GuidelineRepository
    constructor(guidelineRepository: GuidelineRepository) {
        this._guidelineRepository = guidelineRepository;
    }

    async saveGuideline(guideline: Guideline): Promise<Guideline> { 
        const savedGuideline = await this._guidelineRepository.saveGuideline(guideline);
        return savedGuideline;
    }

    async updateGuideline(id: string, guideline: Guideline): Promise<Guideline> { 
        const updatedGuideline = await this._guidelineRepository.updateGuideline(id, guideline);
        return updatedGuideline;
    
    }

    async findGuidelineByName(name: string): Promise<Guideline[]> { 
        const findedGuideline = await this._guidelineRepository.findGuidelineByName(name);
        return findedGuideline; 
    }

    async findAllGuidelines(): Promise<Guideline[]> { 
        const findedGuideline = await this._guidelineRepository.findAllGuidelines();
        return findedGuideline; 
    }
}

export default new GuidelineService(new GuidelineRepository());