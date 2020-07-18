import * as Joi from '@hapi/joi';
import { IObject } from 'src/typings/common';
import { HttpError } from 'tymon';
import { COMMON_ERRORS } from './constant';

export enum SCHEMA {
    LOGIN = 'login',
    CREATE_POST = 'create_post',
    UPDATE_POST = 'update_post'
}

export const COMMON_SCHEME = {
    PAGINATION: Joi.object({
        page: Joi.number().integer().positive().default(1).optional(),
        per_page: Joi.number().integer().positive().default(10).optional(),
        sort: Joi.string().optional().default('-created_at')
    })
};

const schemas: IObject<Joi.ObjectSchema> = {
    [SCHEMA.LOGIN]: Joi.object({
        body: Joi.object({
            username: Joi.string().required(),
            password: Joi.string().required()
        }).required()
    }),
    [SCHEMA.CREATE_POST]: Joi.object({
        body: Joi.object({
            title: Joi.string().min(4).max(50).required(),
            content: Joi.string().min(10).required()
        }).required()
    }),
    [SCHEMA.UPDATE_POST]: Joi.object({
        body: Joi.object({
            title: Joi.string().min(4).max(50).optional(),
            content: Joi.string().min(10).optional()
        }).required(),
        params: Joi.object({
            id: Joi.string().required()
        }).required()
    })
};

const defaultOptions: IObject = {
    stripUnknown: {
        arrays: false,
        objects: true
    },
    abortEarly: false
};

export const SchemeValidator = (input: IObject, scheme: Joi.ObjectSchema, options: IObject = defaultOptions): any => {
    return Joi.validate(input, scheme, options).catch((err): void => {
        const details = err.details.reduce((detail: any, item: any): IObject => {
            detail[item.context.key] = item.message.replace(/"/g, '');
            return detail;
        }, {});
        throw new HttpError.HttpError({
            message: 'error validating fields',
            http_status: 422,
            name: COMMON_ERRORS.VALIDATION_ERROR,
            data: details
        });
    });
};

export const ValidatorFactory = (input: IObject, schema: SCHEMA, options: IObject = defaultOptions): any => {
    const scheme: Joi.ObjectSchema = schemas[schema];
    return SchemeValidator(input, scheme, defaultOptions);
};

export default ValidatorFactory;
