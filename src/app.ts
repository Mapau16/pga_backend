import { Router } from 'express';

import { AppRoutes } from './presentation/routes';
import { Server } from './presentation/server';

const port = 3000;
const routes: Router = AppRoutes.routes;
const server = new Server(port, routes);
server.start();
