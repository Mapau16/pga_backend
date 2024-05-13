import { ClientRepository } from "../infraestructure/repositories/client";
import { Client } from "../models/client.model";

class ClientService {

    private _clientRepository: ClientRepository
    constructor(clientRepository: ClientRepository) {
        this._clientRepository = clientRepository;
    }

    async saveClient(client: Client): Promise<Client> { 
        const savedClient = await this._clientRepository.saveClient(client);
        return savedClient;
        //TODO: return client
    }

    async updateClient(id: string, client: Client): Promise<Client> { 
        const updatedClient = await this._clientRepository.updateClient(id, client);
        return updatedClient;
    
    }

    async findClientByName(name: string): Promise<Client[]> { 
        const findedClient = await this._clientRepository.findClientByName(name);
        return findedClient; 
    }

    async findAllClients(): Promise<Client[]> { 
        const findedClient = await this._clientRepository.findAllClients();
        return findedClient; 
    }
}

export default new ClientService(new ClientRepository());