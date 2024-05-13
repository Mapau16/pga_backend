import mongoose from "mongoose";
import ClientSchema, { Client } from "../../models/client.model";

interface IClientRepository {
    saveClient(client: Client): Promise<Client>,
    updateClient(id: string, client: Client): Promise<Client>,
    findClientByName(name: string): Promise<Client[]>,
}

export class ClientRepository implements IClientRepository {
    
    async saveClient(client: Client): Promise<Client> {
        const newClient = await ClientSchema.create(client);
       return newClient;
    }

    async updateClient(id: string, client: Client): Promise<Client> {
       const updateClient = await ClientSchema.findOneAndUpdate({_id: new mongoose.Types.ObjectId(id)}, client, { upsert: true, new: true })
       return updateClient;
    }

    async findClientByName(name: string): Promise<Client[]> {
        const client = await ClientSchema.find({ "name" : { $regex: name, $options: 'i' }})
        return client!;
    }

    async findAllClients(): Promise<Client[]> {
        const client = await ClientSchema.find({});
        return client!;
    }
}