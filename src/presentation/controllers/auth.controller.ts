import { Request, Response } from "express";

import AuthService from "../../services/auth.service";
import { JwtAdapter } from "../../config/jwt.adapter";

export class AuthController {

    public async login(req: Request, res: Response) {
        try {
            const data = await AuthService.login(req.body);
            if (data.error?.message) {
                res.status(400).send(data.error);
                return;
            }
            res.status(200).send(data);            
        } catch (error) {
            console.log(error);
        }
    }
    
    public async register(req: Request, res: Response) {
        try {
            const newUser = await AuthService.register(req.body);
            res.status(200).send(newUser);            
        } catch (error) {
            console.error(error);
        }
    }

    public async refreshToken(req: Request, res: Response) {
        try {
            const { user } = req.body;
            if (!user) {
                res.status(400).send({message: 'Property user is missing'}); 
                return;
            }
            const newToken = await AuthService.refreshToken(user);
            if (newToken.error) {
                res.status(401).send(newToken.error);
                return;
            }
            res.status(200).send({ token: newToken });            
        } catch (error) {
            console.error(error);
        }
    }

    public async validateEmail(req: Request, res: Response) {
        try {
            const { token } = req.params;
            const tokenValidation = await AuthService.validateEmail(token);
            if (tokenValidation?.error) {
                res.status(400).send({ message: tokenValidation?.error.message, email_validated: false });
                return;
            }
            
            res.status(200).send({ email_validated: true });  
        } catch (error) {
            console.error(error);
        }
    }
}
