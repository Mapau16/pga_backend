import { IAuth } from "../../models/auth.model";
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

    async getDataAndAuth(email: string): Promise<IAuth> {
        const data = await UserSchema.aggregate([
            {$match: { email }},
            { $lookup: {
                    from: "auth",
                    localField: "_id",
                    foreignField: "user",
                    as: "_auth"
            }},
            { $unwind: {
                path: "$_auth",
            }},
            { $addFields: {
                token: "$_auth.token",
                "user._id": "$_id",
                "user.email": "$email",
                "user.username": "$username",
                "user.verified": "$verified",
                "user.clients": "$clients",
                "user.createdAt": "$createdAt",
                "user.updatedAt": "$updatedAt",
            }},
            { $project: {
                token: 1,
                user: 1,
                _id: 0,
            }}
        ]).option({ allowDiskUse: true });

        return data[0];
    }

}