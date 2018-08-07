import { Response as res } from 'express';

export const apiResponse = (res: res, message: string, content: object | null = null, code: number = 200) => {
  return res.status(code).json({ message, code, content });
};

export default {
  apiResponse
};
