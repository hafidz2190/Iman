var appConfig = require('../config.json');
var knex = require('knex')(appConfig.database);
var bookshelf = require('bookshelf')(knex);

bookshelf.plugin('registry');

module.exports = bookshelf;