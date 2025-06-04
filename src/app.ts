import express, {NextFunction} from 'express';
import exampleRoutes from './routes/exampleRoutes';
import {errorHandler} from './middleware/errorHandler';
import itacapRoutes from "./routes/itacapRoutes";
import actlogRoutes from "./routes/actlogRoutes";
import {expressjwt} from "express-jwt";
import config from "./config";
import authRoutes from "./routes/authRoutes";
import bodyParser from 'body-parser';
import {isServiceError} from "./models/serviceError";
import {Request, Response} from "express";

const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({extended: false})); // Middleware to parse URL-encoded bodies

// const pino = require('pino-http')()
// app.use(pino)

// pino.log.debug('xxx')

// Swagger
// https://www.npmjs.com/package/swagger-ui-express
// https://www.npmjs.com/package/swagger-jsdoc
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const cors = require('cors');
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'ITAC Activity Portal REST API',
            version: '1.0.0',
        },
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                }
            }
        },
    },
    apis: [
        './src/routes/*.ts',
        './src/models/*.ts'
    ],
};

// Cors
const corsOptions = {
    origin: 'http://localhost:5173',
    methods: 'GET,PUT,POST,DELETE',
    credentials: true
}
app.use(cors(corsOptions));

let swaggerSpec = null;
try {
    swaggerSpec = swaggerJsdoc(options);
    // console.log('swagger-jsdoc completed successfully.');
} catch (e) {
    // eslint-disable-next-line no-console
    console.error('Error during swagger-jsdoc:', e);
    throw e
}

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// JWT Authentication Middleware
app.use(
    expressjwt({
        secret: config.jwtSecret,
        algorithms: ["HS256"],
    }).unless({
        path: [
            "/auth/login",
            "/api/itacap/refData",
        ]
    })
);

app.use(express.json());

// Routes
app.use('/api/example', exampleRoutes);
app.use('/api/itacap', itacapRoutes);
app.use('/api/itacap/actlog', actlogRoutes)
app.use('/auth', authRoutes);

// Global error handler (should be after routes)
app.use(errorHandler);

export default app;
