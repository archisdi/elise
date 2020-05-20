'use strict';

const { generateMigration } = require('../helper');
const { model, options } = require('../models/user');

module.exports = generateMigration(options.tableName, model);
