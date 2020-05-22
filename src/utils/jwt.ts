import * as jwt from 'jsonwebtoken';
import * as random from 'randomstring';
import * as moment from 'moment';
import * as bcrypt from 'bcryptjs';
import { RefreshToken, Tokenable } from '../typings/auth';

export default class JWT {
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

    public static verifyToken(token: string): any {
        return jwt.verify(token, String(process.env.JWT_SECRET));
    }

    public static generateRefreshToken(): RefreshToken {
        return {
            token: random.generate(JWT.REFRESH_TOKEN_LENGTH),
            valid_until: moment().add(JWT.REFRESH_TOKEN_LIFETIME, 'days').utc().format()
        };
    }

    public static generateHash(password: string): string {
        return bcrypt.hashSync(password, JWT.SALT);
    }

    public static validatePassword = (password: string, hash: string): boolean => {
        return bcrypt.compareSync(password, hash);
    };
}
