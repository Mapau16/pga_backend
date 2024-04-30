import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";

export class AuthRouter {

    static get routes(): Router {
        const router = Router();

        const authController = new AuthController();
    
        router.post('/login', authController.login);
        router.post('/register', authController.register);
        router.post('/refresh', authController.refreshToken);

        return router;
    }

}