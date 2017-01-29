var appConfig = require('../config.json');
var knex = require('knex')(appConfig.database);
var bookshelf = require('bookshelf')(knex);
var uuid = require('bookshelf-uuid');

bookshelf.plugin('registry');
bookshelf.plugin(uuid);

module.exports = bookshelf;