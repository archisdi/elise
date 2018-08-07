export default (message: string, code: number = 500, detail = null) => {
  const err: any = new Error(message);
  err.code = code;
  if (detail) err.detail = detail;
  return err;
};
