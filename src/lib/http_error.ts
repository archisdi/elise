import * as Err from 'http-status-codes';

interface IErrorDetail {
    name: string;
    statusCode: number;
    message: string;
}

const errors = [
    { name: 'BadRequest', statusCode: Err.BAD_REQUEST, message: 'Bad Request' },
    { name: 'NotAuthorized', statusCode: Err.UNAUTHORIZED, message: 'Not Authorized' },
    { name: 'Forbidden', statusCode: Err.FORBIDDEN, message: 'Forbidden' },
    { name: 'NotFound', statusCode: Err.NOT_FOUND, message: 'Not Found' },
    { name: 'UnprocessableEntity', statusCode: Err.UNPROCESSABLE_ENTITY, message: 'Unprocessable Entity' },
    { name: 'TooManyRequests', statusCode: Err.TOO_MANY_REQUESTS, message: 'Too Many Requests' },
    { name: 'InternalServerError', statusCode: Err.INTERNAL_SERVER_ERROR, message: 'Internal Server Error' }
];

class CustomError extends Error {
    public status: number;
    public message: string;
    public detail: string | null;

    constructor(message: string, detail: string | null, status: number) {
        super(message);
        this.message = message;
        this.status = status;
        this.detail = detail;
    }
}

// tslint:disable-next-line
const HttpError: any = {};

const initialize = () => {
    errors.forEach((e: IErrorDetail) => {
        HttpError[e.name] = (userMessage: string | null) => new CustomError(e.message, userMessage, e.statusCode);
    });
};

export {
    initialize,
    HttpError
};
