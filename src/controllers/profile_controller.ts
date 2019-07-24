import { HttpError } from "tymon";

import { IContext, IData } from "src/typings/common";
import AuthMiddleware from "../middlewares/auth";
import UserRepository from "../repositories/user_repo";
import BaseController from "./base/base_controller";

export default class ProfileController extends BaseController {
    public async getProfile(data: IData, context: IContext): Promise<object> {
        try {
            const userRepo = new UserRepository(context);
            const user = await userRepo.findOne(context.username);

            if (!user) {
                throw HttpError.NotFound("user not found", "USER_NOT_FOUND") ;
            }

            return {
                message: "profile data retrieved",
                data: user
            };
        } catch (err) {
            if (err.status) { throw err; }
            throw HttpError.InternalServerError(err.message);
        }
    }

    public setRoutes(): void {
        this.addRoute("get", "/", [AuthMiddleware], this.getProfile);
    }
}
