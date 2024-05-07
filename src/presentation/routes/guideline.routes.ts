import { Router } from "express";
import { GuidelineController } from "../controllers/guideline.controller";


export class GuidelineRouter {

    static get routes(): Router {
        const router = Router();

        const guidelineController = new GuidelineController();
    
        router.post('/', guidelineController.saveGuideline);
        router.patch('/:id', guidelineController.updateGuideline);
        router.get('/', guidelineController.findGuidelineByName);

        return router;
    }

}