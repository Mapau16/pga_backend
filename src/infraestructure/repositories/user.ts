import UserSchema, { User } from "../../models/user.model";

interface IUserRepository {
    registerUser(user: User): Promise<User>,
    findByEmail(email: string): Promise<User>,
    updateUser(email: string, data: any): Promise<User>,
}

export default class UserRepository implements IUserRepository  {

    async findByEmail(email: string): Promise<User> {
        const user = await UserSchema.findOne({ email }).lean();
        return user!;
    }

    async registerUser(user: User): Promise<User> {
       const newUser = await UserSchema.create(user);
       return newUser;
    }

    async updateUser(email: string, data: any): Promise<User> {
        const user = await UserSchema.findOneAndUpdate({ email }, data, { upsert: true, new: true });
        return user;
    }

}