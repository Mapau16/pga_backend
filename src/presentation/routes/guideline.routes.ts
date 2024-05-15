import { Router } from "express";
import { GuidelineController } from "../controllers/guideline.controller";
import { validateToken } from "../middlewares/auth.middleware";


export class GuidelineRouter {

    static get routes(): Router {
        const router = Router();

        const guidelineController = new GuidelineController();
    
        router.get('/search', guidelineController.findGuidelineByName);
        router.post('/', guidelineController.saveGuideline);
        router.patch('/:id', guidelineController.updateGuideline);
        router.get('/', validateToken, guidelineController.findAllGuidelines);

        return router;
    }

}