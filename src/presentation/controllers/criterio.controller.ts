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

    public async findCriterioByName(req: Request, res: Response) {
        try {
            const { name } = req.query as unknown as RequestQuery;
            const criterios = await CriterioService.findCriterioById(name);
            res.status(200).json(criterios);            
        } catch (error) {
            console.error("Error finding criterios:", error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    public async updateCriterio(req: Request, res: Response) {
        try {
            const { idcriterio } = req.params; 
            const criterioData = req.body;

            const updatedClient = await CriterioService.updateCriterio(idcriterio, criterioData);
            if (!updatedClient) {
                res.status(404).json({ error: 'Client not found' });
                return;
            }
            res.status(200).json(updatedClient);
        } catch (error) {
            console.error("Error updating client:", error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
    
}
