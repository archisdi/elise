import { RequestHandler, Router } from 'express';
import HandlerFactory from '../../factories/handler';
import jwt_auth from '../../middlewares/jwt_auth';
import request_validator from '../../middlewares/request_validator';
import route_cache from '../../middlewares/route_cache';
import { MethodHandler } from '../../typings/common';
import { SCHEMA } from '../../utils/validator';

type AllowedMethod = 'get' | 'post' | 'put' | 'delete';
type MiddleWare = RequestHandler | RequestHandler[];

export interface StaticBaseController {
    new (...param: any): BaseController;
}

interface ControllerOptions {
    path: string;
    middleware?: MiddleWare;
}

interface RouteOptions {
    auth?: boolean;
    cache?: boolean;
    middlewares?: MiddleWare
    validate?: SCHEMA
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
        path = '/',
        handler: MethodHandler<DataOutput>,
        options?: RouteOptions
    ): void {
        const middlewares = options?.middlewares ? options.middlewares instanceof Array ? options.middlewares : [options.middlewares] : [];

        if (options?.auth) {
            middlewares.push(jwt_auth());
        }

        if (options?.validate) {
            middlewares.push(request_validator(options.validate));
        }

        if (options?.cache) {
            middlewares.push(route_cache);
        }

        const routeMiddleware: RequestHandler[] = middlewares instanceof Array ? middlewares : [middlewares];
        this.routes[httpMethod](path, [...this._middlewares, ...routeMiddleware], HandlerFactory(handler, options?.cache));
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
