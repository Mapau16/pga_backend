import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
//import AuthService from "../services/auth.service";

export class ClientRouter {

    static get routes(): Router {
        const router = Router();

        const authController = new AuthController();
    
        router.post('/login', authController.login);
        router.post('/register', authController.register);

        return router;
    }

}