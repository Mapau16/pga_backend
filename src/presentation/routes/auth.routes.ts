import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import { verifyToken } from "../middlewares/auth.middleware";

export class AuthRouter {

    static get routes(): Router {
        const router = Router();

        const authController = new AuthController();
    
        router.post('/login', authController.login);
        router.post('/register', authController.register);
        router.post('/refresh', authController.refreshToken);
        router.get('/validate-email/:token', authController.validateEmail);
        router.get('/check-auth', verifyToken, authController.validateAuth);

        return router;
    }

}