import { Client } from "../../models/client.model";

interface IClientRepository {
    saveClient(client: Client): Promise<Client>,
    updateClient(id: string, client: Client): Promise<Client>,
    findClientByName(name: string): Promise<Client>,
}

export class AuthRepository implements IClientRepository {
    updateClient(id: string, client: Client): Promise<Client> {
        throw new Error("Method not implemented.");
    }
    findClientByName(name: string): Promise<Client> {
        throw new Error("Method not implemented.");
    }
    saveClient(client: Client): Promise<Client> {
        throw new Error("Method not implemented.");
    }


}