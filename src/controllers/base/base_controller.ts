import { Router, RequestHandler } from 'express';
import { methodHandler as MethodHandler } from '../../typings/common';
import ExpressWrapper from '../../utils/wrapper/express';

type AllowedMethod = 'get' | 'post' | 'put' | 'delete';
type MiddleWare = RequestHandler | RequestHandler[];

export default class BaseController {
    private routes: Router;
    private middlewares: RequestHandler[];

    public constructor() {
        this.routes = Router({ mergeParams: true });
        this.middlewares = [];
    }

    protected setMiddleware(middleware: MiddleWare): void {
        if (middleware instanceof Array) {
            this.middlewares = middleware;
        } else {
            this.middlewares.push(middleware);
        }
    }

    protected addRoute(
        httpMethod: AllowedMethod,
        path: string = '/',
        handler: MethodHandler,
        middlewares: MiddleWare = []
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
