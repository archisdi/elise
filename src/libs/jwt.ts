import * as jwt from 'jsonwebtoken';
import * as random from 'randomstring';
import * as moment from 'moment';
import * as bcrypt from 'bcryptjs';
import { IRefreshToken, ITokenable } from '../typings/common';

const salt = 10;
const refreshLength = 50;
const refreshLifeTime = 7; // days

export const generateToken = (credentials: ITokenable): string => {
    return jwt.sign(credentials, String(process.env.JWT_SECRET), { expiresIn: Number(process.env.JWT_LIFETIME) });
};

export const verifyToken = (token: string): any => {
    return jwt.verify(token, String(process.env.JWT_SECRET));
};

export const generateRefreshToken = (): IRefreshToken => {
    return {
        token: random.generate(refreshLength),
        valid_until: moment().add(refreshLifeTime, 'days').utc().format()
    };
};

export const generateHash = (password: string): string => {
    return bcrypt.hashSync(password, salt);
};

export const validatePassword = (password: string, hash: string): boolean => {
    return bcrypt.compareSync(password, hash);
};

export default {
    generateToken,
    generateRefreshToken,
    verifyToken,
    generateHash,
    validatePassword
};
