import { RequestHandler } from 'express';
import * as ExpressGraphQL from 'express-graphql';
import AuthMiddleware from '../middlewares/jwt_auth';
import Endpoints from './endpoint';

interface GraphQLOptions {
    enable_graphiql: boolean;
    is_protected: boolean;
}

export default class GraphQL {
    private instance: ExpressGraphQL.Middleware;
    private is_protected: boolean;

    public constructor(options: GraphQLOptions) {
        this.is_protected = options.is_protected;
        this.instance = ExpressGraphQL({
            graphiql: options.enable_graphiql,
            schema: Endpoints
        });
    }

    public getInstance(): RequestHandler | RequestHandler[] {
        return this.is_protected ? [AuthMiddleware(), this.instance] : this.instance;
    }
}
