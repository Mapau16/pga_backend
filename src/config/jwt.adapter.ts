import jwt from 'jsonwebtoken';

export const JwtAdapter = {

    generateToken: (payload:any, duration: string, key: string): string => {
       return jwt.sign(payload, key, { expiresIn: duration});
    },
    validateToken: (token: string, key: string) => {
        try {
            return jwt.verify(token, key);            
        } catch (error) {
            return null;//if refresh token expires
        }
    }
}