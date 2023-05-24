// Base Imports
import express from 'express';
import cors from 'cors';
import path from 'node:path';

// Other's
import { databaseConnect } from './config/db';
import routerBank from './routes';
import { config } from './config/config';

databaseConnect().then(() => {

    const app = express();

    app.use(cors({ credentials: true, origin: 'http://127.0.0.1:5173' }));
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use('/api', routerBank);
    app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

    app.listen(config.port);

}).catch((err) => console.log(err));
