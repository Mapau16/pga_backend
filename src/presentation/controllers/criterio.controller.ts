import { Request, Response } from "express";
import CriterioService from "../../services/criterio.service";

interface RequestQuery {
    name: string;
  }

export class CriterioController {

    public async saveCriterio(req: Request, res: Response) {
        try {
            const criterioData = req.body;

            const savedCriterio= await CriterioService.saveCriterio(criterioData);
            res.status(201).json(savedCriterio); // 201: Created
        } catch (error) {
            console.error("Error saving criterio:", error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}
