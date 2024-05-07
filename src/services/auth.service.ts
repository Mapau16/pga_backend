import { JwtAdapter } from "../config/jwt.adapter";
import { bcriptAdapter } from "../config/bcript.adapter";
import { errorResponse } from "../config/error.adapter";

import UserRepository from "../infraestructure/repositories/user";
import { AuthRepository } from "../infraestructure/repositories/auth";

import { User } from "../models/user.model";
import { Ilogin } from "../models/auth.model";
import { EmailService } from "./email.service";

class AuthService {

    private _userRepository: UserRepository;
    private _authRepository: AuthRepository;
    
    constructor(
        userRepository: UserRepository, 
        authRepository: AuthRepository, 
        private readonly _emailService: EmailService) { 
        this._userRepository = userRepository;
        this._authRepository = authRepository;
    }

    public async login(data: { email: string, password: string }): Promise<Ilogin> {

        
        let user: User = await this._userRepository.findByEmail(data.email);
        //validate if user.verified is true
        if (!user) return errorResponse('Email or password incorrect');
        if (!user.verified) {
           const newEmail = await this.sendEmailValidation(user.email);
           return errorResponse('User not verified, new email sent');
        }
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

        //validate if the email is already taken
       const hasedPass = await bcriptAdapter.hash(user.password!);
       user.verified = false;
       user.password = hasedPass;
       const newUser = await this._userRepository.registerUser(user);
       //send email to verify user
       await this.sendEmailValidation(user.email);
       return newUser;
    }

    private async sendEmailValidation(userEmail: string): Promise<void> {
        
        const token = JwtAdapter.generateToken({email: userEmail}, '10m', 'EMAILTOKEN');
        const link = `http://localhost:3000/api/v1/auth/validate-email/${token}`;
        const html = `
        <h1>Valida tu email</h1>
        <p>Click en el siguiente link para validar tu email</p>
        <a href="${ link }">Validate your email: ${ userEmail }</a>`;

        const options = {
            to: userEmail,
            subject: 'Validación de email',
            htmlBody: html,
        };

        const emailSent = await this._emailService.sendEmail(options);
        console.log(`sentmail: ${emailSent}`);
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

    public async validateEmail(token: string) {
        const validation = JwtAdapter.validateToken(token, 'EMAILTOKEN');
        if (!validation) return errorResponse('Invalid token'); 
        const { email } = validation as { email: string };
        const user = await this._userRepository.findByEmail(email);
        if (!user) return errorResponse('User not exist');
        await this._userRepository.updateUser(user.email, { verified: true });
    }
}

export default new AuthService(new UserRepository(), new AuthRepository(), new EmailService('gmail', 'joser16torres@gmail.com', 'rmjy cnxp gguf lkbg'));