import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import * as moment from 'moment';
import * as random from 'randomstring';
import { RefreshToken, Tokenable } from '../typings/auth';

export default class Auth {
    private static SALT = 10;
    private static REFRESH_TOKEN_LENGTH = 50;
    private static REFRESH_TOKEN_LIFETIME = 7; // days

    public static generateToken(credentials: Tokenable): { token: string; lifetime: number } {
        const lifetime = Number(process.env.JWT_LIFETIME);
        const token = jwt.sign(credentials, String(process.env.JWT_SECRET), { expiresIn: lifetime });
        return {
            token,
            lifetime
        };
    }

    public static verifyJwtToken(token: string): any {
        return jwt.verify(token, String(process.env.JWT_SECRET));
    }

    public static generateRefreshToken(): RefreshToken {
        return {
            token: random.generate(Auth.REFRESH_TOKEN_LENGTH),
            valid_until: moment().add(Auth.REFRESH_TOKEN_LIFETIME, 'days').utc().format()
        };
    }

    public static generateHash(password: string): string {
        return bcrypt.hashSync(password, Auth.SALT);
    }

    public static validatePassword = (password: string, hash: string): boolean => {
        return bcrypt.compareSync(password, hash);
    };
}
