'use strict';

const { generateMigration } = require('../helper');
const { model, options } = require('../models/quote');

module.exports = generateMigration(options.tableName, model);
