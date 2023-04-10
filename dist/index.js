import 'colors';
import 'dotenv/config';
import { ApolloServer } from '@apollo/server';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { typeDefs } from './schema/index.js';
import { resolvers } from './resolvers/index.js';
import express from 'express';
import session from 'express-session';
import http from 'http';
import cors from 'cors';
import bodyParser from 'body-parser';
import { expressMiddleware } from '@apollo/server/express4';
const API_PORT = +process.env.API_PORT || 4000;
const app = express();
const httpServer = http.createServer(app);
const server = new ApolloServer({
    typeDefs,
    resolvers,
    //context: ({req, res}: any) => ({req}),
    plugins: [
        ApolloServerPluginDrainHttpServer({ httpServer }),
        ApolloServerPluginLandingPageLocalDefault({ includeCookies: true }),
    ],
});
await server.start();
/* const { url } = await startStandaloneServer(server, {
  context: async ({ req, res }) => ({
    const token = req.headers.authorization
    console.log(token)
    return token }),
  
  listen: { port: API_PORT },
}); */
app.use('/graphql', cors({
    origin: ['https://studio.apollographql.com', 'http://localhost:3000'],
    //exposedHeaders: 'Set-Cookie',
    credentials: true,
}), bodyParser.json(), session({
    name: 'iduser',
    secret: 'whateverIsTheK#y',
    resave: false,
    saveUninitialized: false,
    cookie: {
        path: '/',
        httpOnly: false,
        sameSite: 'none',
        secure: false,
        maxAge: 1000 * 60 * 60,
    },
}), expressMiddleware(server, {
    context: async ({ req, res }) => ({ req, res }),
}));
await new Promise((resolve) => httpServer.listen({ port: API_PORT }, resolve));
const url = 'http://localhost:4000';
console.log(`${'Server is listening at'.green} ${url.yellow}`);
