import { Request, Response } from "express";
import RoleService from "../../services/role.service";

interface RequestQuery {
    name: string;
  }

export class RoleController {

    public async saveRole(req: Request, res: Response) {
        try {
            const roleData = req.body;

            const savedRole = await RoleService.saveRole(roleData);
            res.status(201).json(savedRole); // 201: Created
        } catch (error) {
            console.error("Error saving role:", error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
    
    
    public async updateRole(req: Request, res: Response) {
        try {
            const { id } = req.params; 
            const roleData = req.body;

            const updatedRole = await RoleService.updateRole(id, roleData);
            if (!updatedRole) {
                res.status(404).json({ error: 'Role not found' });
                return;
            }
            res.status(200).json(updatedRole);
        } catch (error) {
            console.error("Error updating role:", error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    public async findRoleByName(req: Request, res: Response) {
        try {
            const {name} = req.query as unknown as RequestQuery;

            const foundRole = await RoleService.findRoleByName(name);
            if (!foundRole) {
                res.status(404).json({ error: 'Role not found' });
                return;
            }
            res.status(200).json(foundRole);
        } catch (error) {
            console.error("Error finding role:", error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    public async findAllRoles(req: Request, res: Response) {
        try {
            const roles = await RoleService.findAllRoles();
            res.status(200).json(roles);
        } catch (error) {
            console.error("Error finding role:", error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}