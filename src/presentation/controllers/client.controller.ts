import { Request, Response } from "express";

import AuthService from "../../services/auth.service";

export class AuthController {

    public async createClient(req: Request, res: Response) {
        try {
            const data = await AuthService.createClient(req.body);
            if (data.error?.message) {
                res.status(400).send(data.error);
                return;
            }
            res.status(200).send(data);            
        } catch (error) {
            console.log(error);
        }
    }
    
    public async editClient(req: Request, res: Response) {
        try {
            const data = await AuthService.editClient(req.params.clientId, req.body);
            if (data.error?.message) {
                res.status(400).send(data.error);
                return;
            }
            res.status(200).send(data); 
        } catch (error) {
            console.log(error);
        }
    }

    public async searchClients(req: Request, res: Response) {
        try {
            const query = req.query.q; 
            const data = await AuthService.searchClient(query);
            res.status(200).send(data); 
        } catch (error) {
            console.log(error);
        }
    }
}