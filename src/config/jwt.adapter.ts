import jwt from 'jsonwebtoken';

const SECRET_KEY = 'TEST';
export const JwtAdapter = {

    generateToken: (payload:any, duration: string): string => {
       return jwt.sign(payload, SECRET_KEY, { expiresIn: duration});
    },
    validateToken: (token: string) => {
        return jwt.verify(token, SECRET_KEY);
    }
}