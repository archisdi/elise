'use strict';

const { generateMigration } = require('../helper');
const { model, options } = require('../models/post');

module.exports = generateMigration(options.tableName, model);
