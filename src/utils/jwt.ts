import jwt from 'jsonwebtoken';
import random from 'randomstring';
import moment from 'moment';
import config from '../config/jwt';

type credential = {
  id: string,
  username: string
};

const create = async (credential: credential) => jwt.sign(credential, config.secret, { expiresIn: config.expired });

const verify = async (token: string) => jwt.verify(token, config.secret);

const generateRefreshToken = async () => ({
  token: random.generate({ length: 50 }),
  validity: moment().add(config.refreshTokenExpired, 'seconds')
});

export default {
  create,
  verify,
  generateRefreshToken
};
