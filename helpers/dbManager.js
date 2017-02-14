function dbManager()
{
    var _appConfig = requireLocal('config.json');

    var _knex = require('knex')(_appConfig.database);
    var _bookshelf = require('bookshelf')(_knex);
    var _uuid = require('bookshelf-uuid');

    _bookshelf.plugin('registry');
    _bookshelf.plugin(_uuid);

    return _bookshelf;
}

module.exports = dbManager();