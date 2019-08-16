import { Router } from 'express';
import { IData, IContext, IHandlerOutput } from '../../typings/common';
import ExpressWrapper from '../../utils/wrapper/express';
import { RequestHandler } from 'express-serve-static-core';

type allowedMethod = 'get' | 'post' | 'put' | 'delete';
type methodHandler = (data: IData, context: IContext) => Promise<IHandlerOutput>;

export default class BaseController {
    private routes: Router;
    private middlewares: RequestHandler[];

    public constructor() {
        this.routes = Router({ mergeParams: true });
        this.middlewares = [];
    }

    protected setMiddleware(middleware: RequestHandler | RequestHandler[]): void {
        if (middleware instanceof Array) {
            this.middlewares = middleware;
        } else {
            this.middlewares.push(middleware);
        }
    }

    protected addRoute(
        httpMethod: allowedMethod,
        path: string = '/',
        handler: methodHandler,
        middlewares: RequestHandler[] = []
    ): void {
        const routeMiddleware: RequestHandler[] = middlewares instanceof Array ? middlewares : [middlewares];
        this.routes[httpMethod](path, [...this.middlewares, ...routeMiddleware], ExpressWrapper(handler));
    }

    protected addChildController(controller: { getRoutes(): Router }, path: string = '/'): void {
        this.routes.use(path, controller.getRoutes());
    }

    protected setRoutes(): void {
        /** routes definitions */
    }

    public getRoutes(): Router {
        this.setRoutes();
        return this.routes;
    }
}
