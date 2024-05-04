import express, { Application, Router, json, urlencoded } from "express";
import connectDB from "../infraestructure/db/mongoose";
import cors from "cors";

export class Server {
    private _app: Application = express();
    private _routes: Router;
    private _port: number;

    constructor(port: number, routes: Router) {
        this._port = port
        this._routes = routes;
    }

    public start(): void {
        const corsOptions = {
            origin: 'http://localhost:4200',
        }
        this._app.use(cors(corsOptions));
        this._app.use(json());
        this._app.use(urlencoded({ extended: true }));
        this._app.use(this._routes);

        try {
            connectDB();
            console.log('Connected to database');
        } catch (error) {
            console.error('Error connecting to database', error);
        }

        this._app.listen(this._port, (() => {   
            console.log(`Server running on port ${ this._port }`);
        }));
    }
}