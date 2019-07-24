import { Router } from 'express';
import { IBaseController, IData, IContext } from '../../typings/common';
import ExpressWrapper from '../../utils/wrapper/express';

type middlewareType = any[];
type httpMethodType = 'get' | 'post' | 'put' | 'delete';
type handlerType = (data: IData, context: IContext) => any;

export default class BaseController implements IBaseController {
    private routes: Router;

    public constructor() {
        this.routes = Router();
    }

    public addRoute(httpMethod: httpMethodType, path: string = '/', middlewares: middlewareType, handler: handlerType): void {
        this.routes[httpMethod](path, middlewares, ExpressWrapper(handler));
    }

    public setRoutes(): void {
        /** routes definitions */
    }

    public getRoutes(): Router {
        this.setRoutes();
        return this.routes;
    }
}
