import jwt from 'jsonwebtoken';
import random from 'randomstring';
import moment from 'moment';
import config from '../config/jwt';
import bcrypt from 'bcryptjs';
import AuthRepo from '../repositories/user_repo';

type tokenAble = {
  id: string,
  username: string
};

type credential = {
  username: string,
  password: string
};

const createToken = (credential: tokenAble) => jwt.sign(credential, config.secret, { expiresIn: config.expired });

const verifyToken = (token: string) => jwt.verify(token, config.secret);

const createRefreshToken = () => ({
  token: random.generate({ length: 50 }),
  validity: moment().add(config.refreshTokenExpired, 'seconds')
});

const validate = async (credential: credential) => {
  const auth = await AuthRepo.findOne({ username: credential.username });
  if (!auth) return null;
  if (!bcrypt.compareSync(credential.password, auth.password)) return null;

  const token =  createToken({ id: auth.id, username: auth.username });
  const refresh =  createRefreshToken();

  await auth.update({ refreshToken: refresh.token, tokenValidity: refresh.validity });

  return {
    token,
    refreshToken: refresh.token
  };
};

export default {
  validate
};
