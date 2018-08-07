const expired: number = parseInt(process.env.JWT_EXPIRITY || '60', 10) * 1000;
const refreshTokenExpired: number = parseInt(process.env.JWT_REFRESH_LIMETIME || '3600', 10);
const secret = String(process.env.JWT_SECRET);

export default {
  secret,
  expired,
  refreshTokenExpired
};
