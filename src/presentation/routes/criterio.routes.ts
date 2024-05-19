import { Router } from "express";
import { CriterioController } from "../controllers/criterio.controller";
import { validateToken } from "../middlewares/auth.middleware";


export class CriterioRouter {

    static get routes(): Router {
        const router = Router();

        const criterioController = new CriterioController();
    
        router.post('/', validateToken, criterioController.saveCriterio);

        return router;
    }

}