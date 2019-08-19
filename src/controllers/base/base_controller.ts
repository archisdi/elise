import { Router, RequestHandler } from 'express';
import { methodHandler } from '../../typings/common';
import ExpressWrapper from '../../utils/wrapper/express';

type allowedMethod = 'get' | 'post' | 'put' | 'delete';

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

    protected addChildController(path: string = '/', controller: { getRoutes(): Router }): void {
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
