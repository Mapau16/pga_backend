import { Request, Response } from "express";
import AuthService from "../../services/auth.service";

export class AuthController {
    
    public async login(req: Request, res: Response): Promise<void> {
        const data = await AuthService.login(req.body);
        res.status(200).send(data)
    }
    
    public async register(req: Request, res: Response): Promise<void> {
        const newUser = await AuthService.register(req.body);
        res.status(200).send(newUser);
    }
}
