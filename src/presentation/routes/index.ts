import { Router } from "express";
import { AuthRouter } from "./auth.routes";


export class AppRoutes {

    static get routes(): Router {
        const router = Router();

        router.use('/api/v1/auth', AuthRouter.routes);
        router.use('/api/v1/client', AuthRouter.routes);

        return router;
    }
}