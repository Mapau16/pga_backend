import { NextFunction, Request, Response } from "express";
import { JwtAdapter } from "../../config/jwt.adapter";

interface RequestWithEmail extends Request {
    email?: string,
}

export const verifyToken = (req: RequestWithEmail, res: Response, next: NextFunction) => {
    const header = req.header('Authorization') || '';
    const token = header.split(' ')[1];
    if (!token) return res.status(401).send({message: 'Token not provided'});

    try {
       const payload = JwtAdapter.validateToken(token, 'NORMALTOKEN');
       if (!payload) return res.status(401).send({message: 'Token not valid'});
       const { email } = payload as { email: string }
        req.email = email;
        next();
    } catch (error) {
        return res.status(401).send({message: 'Token not valid'});
    }
}

export const validateToken = (req: RequestWithEmail, res: Response, next: NextFunction) => {
    const header = req.header('Authorization') || '';
    const token = header.split(' ')[1];
    if (!token) return res.status(401).send({message: 'Token not provided'});

    try {
       const payload = JwtAdapter.validateToken(token, 'NORMALTOKEN');
       if (!payload) return res.status(401).send({message: 'Token not valid'});
        next();
    } catch (error) {
        return res.status(401).send({message: 'Token not valid'});
    }
}