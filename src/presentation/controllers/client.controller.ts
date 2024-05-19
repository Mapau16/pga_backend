import { Request, Response } from "express";
import ClientService from "../../services/client.service";

interface RequestQuery {
    name: string;
}

export class ClientController {

    public async saveClient(req: Request, res: Response) {
        try {
            const clientData = req.body;

            const savedClient = await ClientService.saveClient(clientData);
            res.status(201).json(savedClient); // 201: Created
        } catch (error) {
            console.error("Error saving client:", error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
    
    
    public async updateClient(req: Request, res: Response) {
        try {
            const { id } = req.params; 
            const clientData = req.body;

            const updatedClient = await ClientService.updateClient(id, clientData);
            if (!updatedClient) {
                res.status(404).json({ error: 'Client not found' });
                return;
            }
            res.status(200).json(updatedClient);
        } catch (error) {
            console.error("Error updating client:", error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    public async findClientByName(req: Request, res: Response) {
        try {
            const {name} = req.query as unknown as RequestQuery;

            const foundClient = await ClientService.findClientByName(name);
            if (!foundClient) {
                res.status(404).json({ error: 'Client not found' });
                return;
            }
            res.status(200).json(foundClient);
        } catch (error) {
            console.error("Error finding client:", error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    public async findAllClients(req: Request, res: Response) {
        try {
            const clients = await ClientService.findAllClients();
            res.status(200).json(clients);
        } catch (error) {
            console.error("Error finding client:", error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}
