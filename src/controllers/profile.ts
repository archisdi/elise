import { Controller, Get, ClassMiddleware, ClassWrapper } from '@overnightjs/core';
import { HttpError } from 'tymon';

import AuthMiddleware from '../middleware/auth';
import { IContext, IData } from 'src/typings/common';
import ExpressWrapper from '../utils/wrapper/express';

import UserRepository from '../repositories/user_repo';

@Controller('profile')
@ClassMiddleware(AuthMiddleware)
@ClassWrapper(ExpressWrapper)
export default class ProfileController {

    @Get('/')
    private async sgetProfile(data: IData, context: IContext) {
        try {
            const userRepo = new UserRepository(context);
            const user = await userRepo.findOne(context.username);

            if (!user) {
                throw HttpError.NotFound('user not found') ;
            }

            return {
                message: 'profile data retrieved',
                data: user
            };
        } catch (err) {
            if (err.status) { throw err; }
            throw HttpError.InternalServerError(err.message);
        }
    }

}
