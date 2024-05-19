import { Request, Response } from "express";
import CriterioService from "../../services/criterio.service";

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

    public async findAllCriterios(req: Request, res: Response) {
        try {
            const criterios = await CriterioService.findAllCriterios();
            res.status(200).json(criterios);
        } catch (error) {
            console.error("Error finding criterios:", error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    public async findCriterioById(req: Request, res: Response) {
        try {
            const { idcriterio } = req.params;
            const criterio = await CriterioService.findCriterioById(idcriterio);
            res.status(200).json(criterio);            
        } catch (error) {
            console.error("Error finding criterios:", error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    public async updateCriterio(req: Request, res: Response) {

    }
    
}
