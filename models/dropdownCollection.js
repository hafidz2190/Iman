function collectionDefinition()
{
    var _dbManager = require('../helpers/dbManager');
    var _model = require('./dropdownModel');

    var _collection = _dbManager.Collection.extend({
        model: _model
    });

    return _collection;
}

module.exports = collectionDefinition();