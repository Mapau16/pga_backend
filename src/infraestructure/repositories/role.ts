import mongoose from "mongoose";
import RoleSchema, { Role } from "../../models/role.model";

interface IRoleRepository {
    saveRole(role: Role): Promise<Role>,
    updateRole(id: string, role: Role): Promise<Role>,
    findRoleByName(name: string): Promise<Role[]>,
}

export class RoleRepository implements IRoleRepository {
    
    async saveRole(role: Role): Promise<Role> {
        const newRole = await RoleSchema.create(role);
       return newRole;
    }

    async updateRole(id: string, role: Role): Promise<Role> {
       const updateRole = await RoleSchema.findOneAndUpdate({_id: new mongoose.Types.ObjectId(id)}, role, { upsert: true, new: true })
       return updateRole;
    }

    async findRoleByName(name: string): Promise<Role[]> {
        const role = await RoleSchema.find({ "name" : { $regex: name, $options: 'i' }})
        return role!;
    }
}