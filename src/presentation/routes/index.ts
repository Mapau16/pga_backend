import { Router } from "express";
import { AuthRouter } from "./auth.routes";
import { ClientRouter } from "./client.routes";
import { QuestionRouter } from "./question.routes";
import { GuidelineRouter } from "./guideline.routes";
import { ProcessRouter } from "./process.routes";
import { RoleRouter } from "./role.routes";
import { CriterioRouter } from "./criterio.routes";


export class AppRoutes {

    static get routes(): Router {
        const router = Router();

        router.use('/api/v1/auth', AuthRouter.routes);
        router.use('/api/v1/client', ClientRouter.routes);
        router.use('/api/v1/question', QuestionRouter.routes);
        router.use('/api/v1/guideline', GuidelineRouter.routes);
        router.use('/api/v1/process', ProcessRouter.routes);
        router.use('/api/v1/role', RoleRouter.routes);
        router.use('/api/v1/criterio', CriterioRouter.routes);

        return router;
    }
}
