import * as Joi from 'joi';
import { IObject } from 'src/typings/common';

export const COMMON_SCHEME = {
    PAGINATION: Joi.object({
        page: Joi.number().integer().positive().default(1).optional(),
        per_page: Joi.number().integer().positive().default(10).optional(),
        sort: Joi.string().optional().default('-created_at')
    })
};

export const SCHEME: IObject<Joi.ObjectSchema> = {
    LOGIN: Joi.object({
        body: Joi.object({
            username: Joi.string().required(),
            password: Joi.string().required()
        }).required()
    }),
    CREATE_POST: Joi.object({
        body: Joi.object({
            title: Joi.string().min(4).max(50).required(),
            content: Joi.string().min(10).required()
        }).required()
    }),
    UPDATE_POST: Joi.object({
        body: Joi.object({
            title: Joi.string().min(4).max(50).optional(),
            content: Joi.string().min(10).optional()
        }).required(),
        params: Joi.object({
            id: Joi.string().required()
        }).required()
    })
};
