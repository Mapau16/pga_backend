import { Router } from "express";
import { ProcessController } from "../controllers/process.controller";
import { validateToken } from "../middlewares/auth.middleware";


export class ProcessRouter {

    static get routes(): Router {
        const router = Router();

        const processController = new ProcessController();
    
        router.get('/search', processController.findProcessByName);
        router.post('/', processController.saveProcess);
        router.patch('/:id', processController.updateProcess);
        router.get('/', validateToken, processController.findAllProcess);

        return router;
    }

}