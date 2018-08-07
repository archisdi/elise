const port: number = parseInt(process.env.DB_PORT || '3306', 10);

export default {
  table: process.env.DB_NAME || '',
  username: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || '',
  options: {
    port,
    dialect: process.env.DB_DIALECT || 'mysql',
    host: process.env.DB_HOST || '127.0.0.1',
    logging: process.env.APP_DEBUG === 'true' ? console.log : false,
    operatorsAliases: false,
  },
};
