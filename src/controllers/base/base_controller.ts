import { RequestHandler, Router } from 'express';
import HandlerFactory from '../../factories/handler';
import { MethodHandler } from '../../typings/common';

type AllowedMethod = 'get' | 'post' | 'put' | 'delete';
type MiddleWare = RequestHandler | RequestHandler[];

export interface StaticBaseController {
    new (...param: any): BaseController;
}

interface ControllerOptions {
    path: string;
    middleware?: MiddleWare;
}

export default abstract class BaseController {
    private _routes: Router;
    private _middlewares: RequestHandler[] = [];
    private _path: string;

    public constructor({ path, middleware }: ControllerOptions) {
        this._path = path;
        if (middleware) {
            this.setMiddleware(middleware);
        }
        this._routes = Router({ mergeParams: true });
        this.setRoutes();
    }

    protected setMiddleware(middleware: MiddleWare): void {
        if (middleware instanceof Array) {
            this._middlewares = middleware;
        } else {
            this._middlewares.push(middleware);
        }
    }

    protected addRoute<DataOutput = any>(
        httpMethod: AllowedMethod,
        path: string = '/',
        handler: MethodHandler<DataOutput>,
        middlewares: MiddleWare = []
    ): void {
        const routeMiddleware: RequestHandler[] = middlewares instanceof Array ? middlewares : [middlewares];
        this.routes[httpMethod](path, [...this._middlewares, ...routeMiddleware], HandlerFactory(handler));
    }

    protected addChildController(controller: StaticBaseController): void {
        const ctrl = new controller();
        this.routes.use(ctrl.path, ctrl.routes);
    }

    abstract setRoutes(): void;

    public get routes(): Router {
        return this._routes;
    }

    public get path(): string {
        return this._path;
    }
}
