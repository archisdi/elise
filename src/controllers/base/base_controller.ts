import { Router } from 'express';
import { IData, IContext } from '../../typings/common';
import ExpressWrapper from '../../utils/wrapper/express';

type middlewareType = any[];
type httpMethodType = 'get' | 'post' | 'put' | 'delete';
type handlerType = (data: IData, context: IContext) => any;

export default class BaseController {
    private routes: Router;

    public constructor() {
        this.routes = Router();
    }

    protected addRoute(httpMethod: httpMethodType, path: string = '/', middlewares: middlewareType, handler: handlerType): void {
        this.routes[httpMethod](path, middlewares, ExpressWrapper(handler));
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
