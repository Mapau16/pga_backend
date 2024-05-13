import { Router } from "express";
import { ClientController } from "../controllers/client.controller";


export class ClientRouter {

    static get routes(): Router {
        const router = Router();

        const clientController = new ClientController();
    
        router.get('/', clientController.findAllClients);
        router.get('/search', clientController.findClientByName);
        router.post('/', clientController.saveClient);
        router.patch('/:id', clientController.updateClient);

        return router;
    }

}