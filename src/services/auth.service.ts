import { JwtAdapter } from "../config/jwt.adapter";
import { bcriptAdapter } from "../config/bcript.adapter";
import { errorResponse } from "../config/error.adapter";

import UserRepository from "../infraestructure/repositories/user";
import { AuthRepository } from "../infraestructure/repositories/auth";

import { User } from "../models/user.model";
import { IAuth } from "../models/auth.model";
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

    public async login(data: { email: string, password: string }): Promise<IAuth> {

        let user: User = await this._userRepository.findByEmail(data.email);
        //validate if user.verified is true
        if (!user) return errorResponse('Email or password incorrect');
        if (!user.verified) {
           await this.sendEmailValidation(user.email);
           return errorResponse('User not verified, new email sent');
        }
        const isValidPassword = await bcriptAdapter.compare(data.password, user.password!);
        if (!isValidPassword) return errorResponse('Password incorrect');
        const payload = { email: user.email, password: user.password };
        const newToken = JwtAdapter.generateToken(payload, '3h', 'NORMALTOKEN');
        const newRefreshToken = JwtAdapter.generateToken(payload, '6h', 'REFRESHTOKEN');
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
        const link = `http://localhost:4200/auth/validate-account/${token}`;
        const html = `
        <body style="font-family: 'Poppins', Arial, sans-serif">
            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                    <td align="center" style="padding: 20px;">
                        <table class="content" width="600" border="0" cellspacing="0" cellpadding="0" style="border-collapse: collapse; border: 1px solid #cccccc;">
                            <!-- Header -->
                            <tr>
                                <td class="header" style="background-color: #ff7e06; padding: 40px; text-align: center; color: white; font-size: 24px;">
                                Instrucciones de confirmación
                                </td>
                            </tr>

                            <!-- Body -->
                            <tr>
                                <td class="body" style="padding: 40px; text-align: left; font-size: 16px; line-height: 1.6;">
                                Hola! <br>
                                Confirma tu correo ${ userEmail } para poder ingresar a la plataforma.
                                <br><br>
                                    Da click al boton de abajo para confirmar tu cuenta.            
                                </td>
                            </tr>

                            <!-- Call to action Button -->
                            <tr>
                                <td style="padding: 0px 40px 0px 40px; text-align: center;">
                                    <!-- CTA Button -->
                                    <table cellspacing="0" cellpadding="0" style="margin: auto;">
                                        <tr>
                                            <td align="center" style="background-color: #ff7e06; padding: 10px 20px; border-radius: 5px;">
                                                <a href="${ link }" target="_blank" style="color: #ffffff; text-decoration: none; font-weight: bold;">Confirmar cuenta</a>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                            <tr>
                                <td class="body" style="padding: 40px; text-align: left; font-size: 16px; line-height: 1.6;">
                                    Estás recibiendo este correo porque tienes una cuenta en PGA.             
                                </td>
                            </tr>
                            <!-- Footer -->
                            <tr>
                                <td class="footer" style="background-color: #050531; padding: 40px; text-align: center; color: white; font-size: 14px;">
                                Copyright &copy; 2024 | PGA
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </body>`;

        const options = {
            to: userEmail,
            subject: 'Validar cuenta',
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
        const newToken = JwtAdapter.generateToken(payload, '3h', 'NORMALTOKEN');
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

    public async validateAuth(token: string) {
        const validation = JwtAdapter.validateToken(token, 'NORMALTOKEN');
        if (!validation) return errorResponse('Invalid token'); 
        console.log(validation);

    }
}

export default new AuthService(new UserRepository(), new AuthRepository(), new EmailService('gmail', 'joser16torres@gmail.com', 'gzxi dtlo pzjq ykjd'));