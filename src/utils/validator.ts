import * as Joi from '@hapi/joi';
import { HttpError } from 'tymon';
import { COMMON_ERRORS } from './constant';
import { IObject } from 'src/typings/common';

export enum SCHEMA {
    LOGIN = 'login',
    CREATE_POST = 'create_post'
}

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
    })
};

const defaultOptions: IObject = {
    stripUnknown: {
        arrays: false,
        objects: true
    },
    abortEarly: false
};

export default (input: IObject, schema: SCHEMA, options: IObject = defaultOptions): any => {
    const scheme: Joi.ObjectSchema = schemas[schema];

    return Joi.validate(input, scheme, options).catch((err): void => {
        const details = err.details.reduce((detail: any, item: any): object => {
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
