import mongoose from "mongoose";

import AuthSchema from "../../models/auth.model";
import { User } from "../../models/user.model";

interface IAuthRepository {
    saveToken(tokenBody: { user: User, token: string}): Promise<string>,
}

export class AuthRepository implements IAuthRepository {

    async saveToken(tokenBody: { user: User, token: string, refresh_token: string}): Promise<string> {
        const hasToken = await AuthSchema.findOne({ user: tokenBody.user._id});
        if (hasToken) {
            const updatedToken = await AuthSchema.findOneAndUpdate({user: hasToken?.user._id}, tokenBody, { upsert: true });
            return updatedToken?.token!;
        }
        const token = await AuthSchema.create(tokenBody);
        return token.token;
    }

    async findAuth(user: string) {
        const authData = await AuthSchema.aggregate([
            { $match: { 
                user: new mongoose.Types.ObjectId(user)
            }},
            { $lookup: {
                from: "user",
                localField: "user",
                foreignField: "_id",
                as: "data_user"
            }},
            { $unwind: {
                path: "$data_user",
            }},
            { $addFields: {
                user_id: "$data_user._id",
                password: "$data_user.password",
                email: "$data_user.email",
            }},
            { $project: {
                refresh_token: 1,
                user_id: 1,
                email: 1,
                password: 1,
            }}
        ]).option({ allowDiskUse: true });

        return authData[0];
    }

    async saveRefreshedToken(user: any, newToken: string) {
        const response = await AuthSchema.findOneAndUpdate(
            { user: user.user_id }, 
            { token: newToken }, 
            { upsert: true, new: true });

        return response?.token;
    }
}