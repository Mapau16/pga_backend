import { Router } from "express";
import { ClientController } from "../controllers/client.controller";
import { validateToken } from "../middlewares/auth.middleware";


export class ClientRouter {

    static get routes(): Router {
        const router = Router();

        const clientController = new ClientController();
    
        router.get('/search', validateToken, clientController.findClientByName);
        router.post('/', validateToken, clientController.saveClient);
        router.patch('/:id', validateToken, clientController.updateClient);
        router.get('/', validateToken, clientController.findAllClients);

        return router;
    }

}