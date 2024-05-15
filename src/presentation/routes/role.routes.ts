import { Router } from "express";
import { RoleController } from "../controllers/role.controller";
import { validateToken } from "../middlewares/auth.middleware";


export class RoleRouter {

    static get routes(): Router {
        const router = Router();

        const roleController = new RoleController();
    
        router.get('/search', validateToken, roleController.findRoleByName);
        router.post('/', validateToken, roleController.saveRole);
        router.patch('/:id', validateToken, roleController.updateRole);
        router.get('/', validateToken, roleController.findAllRoles);

        return router;
    }

}