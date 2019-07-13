import { Controller, Post, Middleware, Wrapper, ClassWrapper } from '@overnightjs/core';
import { HttpError } from 'tymon';

import ExpressWrapper from '../utils/wrapper/express';
import JWT from '../lib/jwt';
import Validator from '../middleware/request_validator';
import { IContext, IData } from 'src/typings/common';

@Controller('auth')
@ClassWrapper(ExpressWrapper)
export default class AuthController {

    @Post('login')
    @Middleware(Validator('login'))
    private async login(data: IData, context: IContext) {
        try {
            const { body: { username, password } } = data;

            const token: string = await JWT.generateToken({ user_id: username });

            return {
                message: 'authentication success',
                data: {
                    token,
                    expires_in: Number(process.env.JWT_LIFETIME)
                }
            };
        } catch (err) {
            if (err.status) { throw err; }
            throw HttpError.InternalServerError(err.message);
        }
    }

}
