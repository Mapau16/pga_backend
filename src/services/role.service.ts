import { JwtAdapter } from "../config/jwt.adapter";
import { bcriptAdapter } from "../config/bcript.adapter";
import { errorResponse } from "../config/error.adapter";

import { RoleRepository } from "../infraestructure/repositories/role";

import { User } from "../models/user.model";
import { Ilogin } from "../models/auth.model";
import { Client } from "../models/client.model";
import { Question } from "../models/question.model";
import { Guideline } from "../models/guideline.model";
import { Process } from "../models/process.model";
import { Role } from "../models/role.model";

class RoleService {

    private _roleRepository: RoleRepository
    constructor(roleRepository: RoleRepository) {
        this._roleRepository = roleRepository;
    }

    async saveRole(role: Role): Promise<Role> { 
        const savedRole = await this._roleRepository.saveRole(role);
        return savedRole;
    }

    async updateRole(id: string, role: Role): Promise<Role> { 
        const updatedRole = await this._roleRepository.updateRole(id, role);
        return updatedRole;
    
    }

    async findRoleByName(name: string): Promise<Role[]> { 
        const findedRole = await this._roleRepository.findRoleByName(name);
        return findedRole; 
    }
}

export default new RoleService(new RoleRepository());