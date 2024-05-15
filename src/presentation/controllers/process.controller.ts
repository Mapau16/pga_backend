import { Request, Response } from "express";
import ProcessService from "../../services/process.service";

interface RequestQuery {
    name: string;
  }

export class ProcessController {

    public async saveProcess(req: Request, res: Response) {
        try {
            const processData = req.body;

            const savedProcess = await ProcessService.saveProcess(processData);
            res.status(201).json(savedProcess); // 201: Created
        } catch (error) {
            console.error("Error saving process:", error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
    
    
    public async updateProcess(req: Request, res: Response) {
        try {
            const { id } = req.params; 
            const processData = req.body;

            const updatedProcess = await ProcessService.updateProcess(id, processData);
            if (!updatedProcess) {
                res.status(404).json({ error: 'Process not found' });
                return;
            }
            res.status(200).json(updatedProcess);
        } catch (error) {
            console.error("Error updating process:", error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    public async findProcessByName(req: Request<RequestQuery>, res: Response) {
        try {
            const {name} = req.query as unknown as RequestQuery;

            const foundProcess = await ProcessService.findProcessByName(name);
            if (!foundProcess) {
                res.status(404).json({ error: 'Process not found' });
                return;
            }
            res.status(200).json(foundProcess);
        } catch (error) {
            console.error("Error finding process:", error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    public async findAllProcess(req: Request, res: Response) {
        try {
            const process = await ProcessService.findAllProcess();
            res.status(200).json(process);
        } catch (error) {
            console.error("Error finding process:", error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}