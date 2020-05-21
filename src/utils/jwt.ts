import * as jwt from 'jsonwebtoken';
import * as random from 'randomstring';
import * as moment from 'moment';
import * as bcrypt from 'bcryptjs';
import { IRefreshToken, ITokenable } from '../typings/auth';

const SALT = 10;
const REFRESH_TOKEN_LENGTH = 50;
const REFRESH_TOKEN_LIFETIME = 7; // days

export const generateToken = (credentials: ITokenable): { token: string; lifetime: number } => {
    const lifetime = Number(process.env.JWT_LIFETIME);
    const token = jwt.sign(credentials, String(process.env.JWT_SECRET), { expiresIn: lifetime });
    return {
        token,
        lifetime
    };
};

export const verifyToken = (token: string): any => {
    return jwt.verify(token, String(process.env.JWT_SECRET));
};

export const generateRefreshToken = (): IRefreshToken => {
    return {
        token: random.generate(REFRESH_TOKEN_LENGTH),
        valid_until: moment().add(REFRESH_TOKEN_LIFETIME, 'days').utc().format()
    };
};

export const generateHash = (password: string): string => {
    return bcrypt.hashSync(password, SALT);
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
