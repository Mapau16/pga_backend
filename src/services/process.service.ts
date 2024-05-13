import { JwtAdapter } from "../config/jwt.adapter";
import { bcriptAdapter } from "../config/bcript.adapter";
import { errorResponse } from "../config/error.adapter";

import { ProcessRepository } from "../infraestructure/repositories/process";

import { User } from "../models/user.model";
import { IAuth } from "../models/auth.model";
import { Client } from "../models/client.model";
import { Question } from "../models/question.model";
import { Guideline } from "../models/guideline.model";
import { Process } from "../models/process.model";

class ProcessService {

    private _processRepository: ProcessRepository
    constructor(processRepository: ProcessRepository) {
        this._processRepository = processRepository;
    }

    async saveProcess(process: Process): Promise<Process> { 
        const savedProcess = await this._processRepository.saveProcess(process);
        return savedProcess;
    }

    async updateProcess(id: string, process: Process): Promise<Process> { 
        const updatedProcess = await this._processRepository.updateProcess(id, process);
        return updatedProcess;
    
    }

    async findProcessByName(name: string): Promise<Process[]> { 
        const findedProcess = await this._processRepository.findProcessByName(name);
        return findedProcess; 
    }
}

export default new ProcessService(new ProcessRepository());