import { Router } from "express";
import { GuidelineController } from "../controllers/guideline.controller";
import { validateToken } from "../middlewares/auth.middleware";


export class GuidelineRouter {

    static get routes(): Router {
        const router = Router();

        const guidelineController = new GuidelineController();
    
        router.get('/search', validateToken, guidelineController.findGuidelineByName);
        router.post('/', validateToken, guidelineController.saveGuideline);
        router.patch('/:id', validateToken, guidelineController.updateGuideline);
        router.get('/', validateToken, guidelineController.findAllGuidelines);

        return router;
    }

}