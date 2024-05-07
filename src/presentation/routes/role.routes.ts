import { Router } from "express";
import { RoleController } from "../controllers/role.controller";


export class RoleRouter {

    static get routes(): Router {
        const router = Router();

        const roleController = new RoleController();
    
        router.post('/', roleController.saveRole);
        router.patch('/:id', roleController.updateRole);
        router.get('/', roleController.findRoleByName);

        return router;
    }

}