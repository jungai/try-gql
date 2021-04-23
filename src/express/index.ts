import express, { Express } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

export function setupCors(e: Express): Express {
    return e.use(cors());
}

export function setupBodyParser(e: Express): Express {
    return e
        .use(bodyParser.json())
        .use(bodyParser.urlencoded({ extended: false }));
}

export const app: Express = [setupCors, setupBodyParser].reduce(
    (e, middleware) => middleware(e),
    express()
);
