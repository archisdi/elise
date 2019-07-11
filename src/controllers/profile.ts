import { Controller, Get, ClassMiddleware, ClassWrapper } from '@overnightjs/core';
import { HttpError } from 'tymon';

import AuthMiddleware from '../middleware/auth';
import { IContext, IData } from 'src/typings/common';
import ExpressWrapper from '../utils/wrapper/express';

@Controller('profile')
@ClassMiddleware([AuthMiddleware])
@ClassWrapper(ExpressWrapper)
export default class ProfileController {

    @Get('/')
    private getProfile(data: IData, context: IContext) {
        try {
            return {
                message: 'profile data retrieved',
                data: { ...context }
            };
        } catch (err) {
            if (err.status) { throw err; }
            throw HttpError.InternalServerError(err.message);
        }
    }

}
