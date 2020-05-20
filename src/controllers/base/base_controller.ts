import { RequestHandler, Router } from 'express';
import ExpressWrapper from '../../factories/handler';
import { MethodHandler } from '../../typings/common';

type AllowedMethod = 'get' | 'post' | 'put' | 'delete';
type MiddleWare = RequestHandler | RequestHandler[];

export default abstract class BaseController {
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

    protected addRoute<DataOutput = any>(
        httpMethod: AllowedMethod,
        path: string = '/',
        handler: MethodHandler<DataOutput>,
        middlewares: MiddleWare = []
    ): void {
        const routeMiddleware: RequestHandler[] = middlewares instanceof Array ? middlewares : [middlewares];
        this.routes[httpMethod](path, [...this.middlewares, ...routeMiddleware], ExpressWrapper(handler));
    }

    protected addChildController(path: string = '/', controller: { getRoutes(): Router }): void {
        this.routes.use(path, controller.getRoutes());
    }

    // Override
    protected setRoutes(): void {
        throw new Error('route is not set');
    }

    public getRoutes(): Router {
        this.setRoutes();
        return this.routes;
    }
}
