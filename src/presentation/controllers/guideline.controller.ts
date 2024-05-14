import { Request, Response } from "express";
import GuidelineService from "../../services/guideline.service";

interface RequestQuery {
    name: string;
  }

export class GuidelineController {

    public async saveGuideline(req: Request, res: Response) {
        try {
            const guidelineData = req.body;

            const savedGuideline = await GuidelineService.saveGuideline(guidelineData);
            res.status(201).json(savedGuideline); // 201: Created
        } catch (error) {
            console.error("Error saving guideline:", error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
    
    
    public async updateGuideline(req: Request, res: Response) {
        try {
            const { id } = req.params; 
            const guidelineData = req.body;

            const updatedGuideline = await GuidelineService.updateGuideline(id, guidelineData);
            if (!updatedGuideline) {
                res.status(404).json({ error: 'Guideline not found' });
                return;
            }
            res.status(200).json(updatedGuideline);
        } catch (error) {
            console.error("Error updating guideline:", error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    public async findGuidelineByName(req: Request<RequestQuery>, res: Response) {
        try {
            const {name} = req.query as unknown as RequestQuery;

            const foundGuideline = await GuidelineService.findGuidelineByName(name);
            if (!foundGuideline) {
                res.status(404).json({ error: 'Guideline not found' });
                return;
            }
            res.status(200).json(foundGuideline);
        } catch (error) {
            console.error("Error finding guideline:", error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    public async findAllGuidelines(req: Request, res: Response) {
        try {
            const guidelines = await GuidelineService.findAllGuidelines();
            res.status(200).json(guidelines);
        } catch (error) {
            console.error("Error finding guideline:", error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}