import { bcriptAdapter } from "../config/bcript.adapter";
import { JwtAdapter } from "../config/jwt.adapter";
import { AuthRepository } from "../infraestructure/repositories/auth";
import UserRepository from "../infraestructure/repositories/user";
import { Auth } from "../models/auth.model";
import { User } from "../models/user.model";

interface Ilogin {
    user: User;
    token: Auth;
}

class AuthService {

    private _userRepository: UserRepository;
    private _authRepository: AuthRepository;
    
    constructor(userRepository: UserRepository, authRepository: AuthRepository) { 
        this._userRepository = userRepository;
        this._authRepository = authRepository;
    }

    public async login(data: { email: string, password: string }): Promise<Ilogin | { message: string }> {

        let user: User = await this._userRepository.findByEmail(data.email);
        if (!user) return { message: 'Email incorrect' };

        const isValidPassword = await bcriptAdapter.compare(data.password, user.password);

        if (!isValidPassword) return { message: 'Password incorrect'};

        const payload = { email: user.email, password: user.password };
        const token = JwtAdapter.generateToken(payload, '2h');
        const savedToken = await this._authRepository.saveToken({user, token});
        return {user, token: savedToken};
    }

    public async register(user: User): Promise<User> {
       const hasedPass = await bcriptAdapter.hash(user.password);
       user.password = hasedPass;
       const newUser = await this._userRepository.registerUser(user);
       return newUser;
    }
}

export default new AuthService(new UserRepository(), new AuthRepository());