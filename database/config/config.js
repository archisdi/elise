require('dotenv').config({ path: '../.env' });

const { generateConfig } = require('../helper');

const envs = ['development', 'test', 'production'];
const configs = envs.reduce((acc, env) => {
    acc[env] = generateConfig(process.env.DB_CONNECTION_STRING);
    return acc;
}, {});

module.exports = configs;
