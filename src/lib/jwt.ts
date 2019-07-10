import * as jwt from 'jsonwebtoken';
// import * as random from 'randomstring';
// import * as moment from 'moment';
// import * as bcrypt from 'bcryptjs';

interface ITokenable {
  id: string;
  username: string;
}

const generateToken = (credentials: ITokenable) => {
    return jwt.sign(credentials, String(process.env.JWT_SECRET), { expiresIn: Number(process.env.JWT_LIFETIME) });
};

const verifyToken = (token: string) => {
    return jwt.verify(token, String(process.env.JWT_SECRET));
};

export default {
    generateToken,
    verifyToken
};
