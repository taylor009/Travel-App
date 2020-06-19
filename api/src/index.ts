import "reflect-metadata";
import {createConnection, getConnectionOptions} from "typeorm";
import express from 'express';
import session from 'express-session';
// @ts-ignore
import connectSqlite3 from 'connect-sqlite3';
import { ApolloServer } from "apollo-server-express";
import * as path from 'path';
import { buildSchema } from "type-graphql";
import { PlaceResolver } from "./resolvers/PlaceResolver";

const SQLiteStore = connectSqlite3(session);

async function bootstrap() {
    const app = express();

    app.use(session({
        store: new SQLiteStore({
            db: 'database.sqlite',
            concurrentDB: true
        }),
        name: 'qid',
        secret: process.env.SESSION_SECRET || 'sakdnoasndoasdno',
        resave: false,
        saveUninitialized: false,
        cookie: {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 1000 * 60 * 60 * 24 * 7 * 365
        }
    }))

    // Get config options from typeorm-config.js
    const dbOptions = await getConnectionOptions(process.env.NODE_ENV || 'development');

    createConnection({...dbOptions, name: 'default'}).then(async () => {
        /**
         * Build Server Schema
         */
        const schema = await buildSchema({
            resolvers: [PlaceResolver],
            validate: true,
            emitSchemaFile: path.resolve(__dirname, 'schema.graphql')
        });

        /**
         * Create Apollo Server instance
         */
        const apolloServer = new ApolloServer({
            schema,
            context: ({ req, res }) => ({ req, res }),
            introspection: true,
            playground: true
        });
        /**
         * Apply server instance as middleware
         */
        apolloServer.applyMiddleware({ app, cors: true });
        /**
         * Port
         */
        const port : string | number = process.env.PORT || 4000;
        app.listen(port, () => {
            console.log(`Server started at http://localhost:${port}`);
        });

    }).catch(error => console.log(error));
}

bootstrap().then().catch((error) => console.log(error.stack));

