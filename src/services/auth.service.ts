import { JwtAdapter } from "../config/jwt.adapter";
import { bcriptAdapter } from "../config/bcript.adapter";
import { errorResponse } from "../config/error.adapter";

import UserRepository from "../infraestructure/repositories/user";
import { AuthRepository } from "../infraestructure/repositories/auth";

import { User } from "../models/user.model";
import { Ilogin } from "../models/auth.model";

class AuthService {

    private _userRepository: UserRepository;
    private _authRepository: AuthRepository;
    
    constructor(userRepository: UserRepository, authRepository: AuthRepository) { 
        this._userRepository = userRepository;
        this._authRepository = authRepository;
    }

    public async login(data: { email: string, password: string }): Promise<Ilogin> {

        let user: User = await this._userRepository.findByEmail(data.email);
        if (!user) return errorResponse('Email or password incorrect');
        const isValidPassword = await bcriptAdapter.compare(data.password, user.password!);
        if (!isValidPassword) return errorResponse('Password incorrect');
        const payload = { email: user.email, password: user.password };
        const newToken = JwtAdapter.generateToken(payload, '30m', 'NORMALTOKEN');
        const newRefreshToken = JwtAdapter.generateToken(payload, '2h', 'REFRESHTOKEN');
        const token = await this._authRepository.saveToken({user, token: newToken, refresh_token: newRefreshToken});
        delete user.password;
        return {user, token};
    }

    public async register(user: User): Promise<User> {

       const hasedPass = await bcriptAdapter.hash(user.password!);
       user.verified = false;
       user.password = hasedPass;
       const newUser = await this._userRepository.registerUser(user);
       //TODO: send email to verify user
       return newUser;
    }

    public async refreshToken(user: string): Promise<any> {
        
        const userData = await this._authRepository.findAuth(user);
        if (!userData) return errorResponse('User not exist');
        const refreshTokenValid = JwtAdapter.validateToken(userData.refresh_token!, 'REFRESHTOKEN');
        if (!refreshTokenValid) return errorResponse('Refresh token has expired');
        const payload = { email: userData.email, password: userData.password };
        const newToken = JwtAdapter.generateToken(payload, '30m', 'NORMALTOKEN');
        const updatedToken = await this._authRepository.saveRefreshedToken(userData, newToken);
        return updatedToken;
    }
}

export default new AuthService(new UserRepository(), new AuthRepository());