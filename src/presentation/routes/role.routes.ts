import { Router } from "express";
import { RoleController } from "../controllers/role.controller";
import { validateToken } from "../middlewares/auth.middleware";


export class RoleRouter {

    static get routes(): Router {
        const router = Router();

        const roleController = new RoleController();
    
        router.get('/search', roleController.findRoleByName);
        router.post('/', roleController.saveRole);
        router.patch('/:id', roleController.updateRole);
        router.get('/', validateToken, roleController.findAllRoles);

        return router;
    }

}