import { Router } from 'express';
import { IData, IContext } from '../../typings/common';
import ExpressWrapper from '../../utils/wrapper/express';
import { RequestHandler } from 'express-serve-static-core';

type middleware = RequestHandler[];
type httpMethod = 'get' | 'post' | 'put' | 'delete';
type methodHandler = (data: IData, context: IContext) => any;

export default class BaseController {
    private routes: Router;
    private middlewares: middleware;

    public constructor() {
        this.routes = Router({ mergeParams: true });
        this.middlewares = [];
    }

    protected setMiddleware(middleware: RequestHandler | middleware): void{
        if (middleware instanceof Array){
            this.middlewares = middleware;
        } else {
            this.middlewares.push(middleware);
        }
    }

    protected addRoute(httpMethod: httpMethod, path: string = '/', handler: methodHandler, middlewares: middleware = []): void {
        const routeMiddleware: middleware = middlewares instanceof Array ? middlewares : [middlewares];
        this.routes[httpMethod](path, [...this.middlewares, ...routeMiddleware], ExpressWrapper(handler));
    }

    protected addChildController(controller: { getRoutes(): Router }, path: string = '/'): void{
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
