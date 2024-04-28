import UserSchema, { User } from "../../models/user.model";

interface IUserRepository {
    registerUser(user: User): Promise<User>,
    findByEmail(email: string): Promise<User>,
}

export default class UserRepository implements UserRepository  {

    async findByEmail(email: string): Promise<any> {
        const user = await UserSchema.findOne({ email }).lean();
        return user;
    }

    async registerUser(user: User): Promise<User> {
       const newUser = await UserSchema.create(user);
       return newUser;
    }

}