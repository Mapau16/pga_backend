import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import { verifyToken } from "../middlewares/auth.middleware";

export class AuthRouter {

    static get routes(): Router {
        const router = Router();

        const authController = new AuthController();
    
        router.get('/refresh/:user', authController.refreshToken);
        router.get('/validate-email/:token', authController.validateEmail);
        router.get('/check-auth', verifyToken, authController.validateAuth);
        router.post('/login', authController.login);
        router.post('/register', authController.register);

        return router;
    }

}