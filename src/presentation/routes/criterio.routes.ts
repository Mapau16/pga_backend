import { Router } from "express";
import { CriterioController } from "../controllers/criterio.controller";
import { validateToken } from "../middlewares/auth.middleware";


export class CriterioRouter {

    static get routes(): Router {
        const router = Router();

        const criterioController = new CriterioController();
    
        router.post('/', validateToken, criterioController.saveCriterio);
        router.get('/', validateToken, criterioController.findAllCriterios);
        router.get('/search', validateToken, criterioController.findCriterioByName);
        router.get('/:idcriterio', validateToken, criterioController.findCriterioById);
        router.patch('/:idcriterio', validateToken, criterioController.updateCriterio);

        return router;
    }

}