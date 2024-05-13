import UserRepository from "../infraestructure/repositories/user";
import { IAuth } from "../models/auth.model";

class UserService {

    constructor(private _userRepository: UserRepository) { }

    public async getUserByEmail(email: string): Promise<IAuth> {
        const userData = await this._userRepository.getDataAndAuth(email);
        return userData;
    }
}

export default new UserService(new UserRepository);