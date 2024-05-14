import mongoose from "mongoose";
import ProcessSchema, { Process } from "../../models/process.model";

interface IProcessRepository {
    saveProcess(process: Process): Promise<Process>,
    updateProcess(id: string, process: Process): Promise<Process>,
    findProcessByName(name: string): Promise<Process[]>,
}

export class ProcessRepository implements IProcessRepository {
    
    async saveProcess(process: Process): Promise<Process> {
        const newProcess = await ProcessSchema.create(process);
       return newProcess;
    }

    async updateProcess(id: string, process: Process): Promise<Process> {
       const updateProcess = await ProcessSchema.findOneAndUpdate({_id: new mongoose.Types.ObjectId(id)}, process, { upsert: true, new: true })
       return updateProcess;
    }

    async findProcessByName(name: string): Promise<Process[]> {
        const process = await ProcessSchema.find({ "name" : { $regex: name, $options: 'i' }})
        return process!;
    }

    async findAllProcess(): Promise<Process[]> {
        const process = await ProcessSchema.find({});
        return process!;
    }
}