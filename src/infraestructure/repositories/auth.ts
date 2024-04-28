import AuthSchema, { Auth } from "../../models/auth.model";
import { User } from "../../models/user.model";

interface IAuthRepository {
    saveToken(tokenBody: Auth): Promise<Auth>,
}

export class AuthRepository implements IAuthRepository {

    async saveToken(tokenBody: { user: User, token: string}): Promise<Auth> {
        const token = await AuthSchema.create(tokenBody);
        return token;
    }
}