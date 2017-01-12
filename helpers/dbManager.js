var appConfig = require('../config.json');
var knex = require('knex')(appConfig.database);
var bookshelf = require('bookshelf')(knex);
var uuid = require('bookshelf-uuid');
var transaction = require('bookshelf-transaction-manager');

bookshelf.plugin('registry');
bookshelf.plugin(uuid);
bookshelf.plugin(transaction);

module.exports = bookshelf;