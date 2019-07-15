import * as Joi from '@hapi/joi';
import { HttpError } from 'tymon';

const schemas: { [s: string]: Joi.ObjectSchema; } = {
    login: Joi.object({
        body: Joi.object({
            username: Joi.string().required(),
            password: Joi.string().required()
        }).required()
    })
};

const defaultOptions: object = {
    stripUnknown: {
        arrays: false,
        objects: true
    },
    abortEarly: false
};

export default (input: object, schema: string, options: object = defaultOptions): any => {
    const scheme: Joi.ObjectSchema = schemas[schema];

    return Joi.validate(input, scheme, options)
        .catch((err) => {
            const details = err.details.reduce((detail: any, item: any) => {
                detail[item.context.key] = item.message.replace(/"/g, '');
                return detail;
            }, {});
            throw HttpError.UnprocessableEntity(details);
        });
};

