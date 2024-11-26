import express from 'express';
import cors from 'cors';
import pino from "pino-http";
import cookieParser from "cookie-parser";
import usersRoutes from "./routes/users.js";
import waterRoutes from "./routes/water.js";
import {notFoundHandler} from "./middlewares/notFoundHandler.js";
import {errorHander} from "./middlewares/errorHandler.js";
import swaggerDocument from '../docs/swagger.json' assert { type: 'json' };
import swaggerUi from 'swagger-ui-express'

const setupServer = () => {
    const PORT = process.env.PORT || 3000;
    const app = express();

    app.use(cors());

    app.use(
        pino({
            transport: {
                target: 'pino-pretty',
            },
        }),
    );

    app.use(express.json({
        type: ['application/json', 'application/vnd.api+json'],
    }));

    app.use(cookieParser());

     app.use('/api-docs', swaggerUi.serve);
    app.get('/api-docs', swaggerUi.setup(swaggerDocument));

    app.use('/api/users', usersRoutes);
    app.use('/api/water', waterRoutes);


    app.use(notFoundHandler);

    app.use(errorHander);

    app.listen(PORT, () => {
        console.log(`Server started on port ${PORT}`);
    });
};

export default setupServer;