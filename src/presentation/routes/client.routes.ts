import { Router } from "express";
import { ClientController } from "../controllers/client.controller";


export class ClientRouter {

    static get routes(): Router {
        const router = Router();

        const clientController = new ClientController();
    
        router.post('/', clientController.saveClient);
        router.patch('/:id', clientController.updateClient);
        router.get('/', clientController.findClientByName);

        return router;
    }

}