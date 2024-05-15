import { Router } from "express";
import { ProcessController } from "../controllers/process.controller";
import { validateToken } from "../middlewares/auth.middleware";


export class ProcessRouter {

    static get routes(): Router {
        const router = Router();

        const processController = new ProcessController();
    
        router.get('/search', validateToken, processController.findProcessByName);
        router.post('/', validateToken, processController.saveProcess);
        router.patch('/:id', validateToken, processController.updateProcess);
        router.get('/', validateToken, processController.findAllProcess);

        return router;
    }

}