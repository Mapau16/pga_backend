import { Router } from "express";
import { ProcessController } from "../controllers/process.controller";


export class ProcessRouter {

    static get routes(): Router {
        const router = Router();

        const processController = new ProcessController();
    
        router.post('/', processController.saveProcess);
        router.patch('/:id', processController.updateProcess);
        router.get('/', processController.findProcessByName);

        return router;
    }

}