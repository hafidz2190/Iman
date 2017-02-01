function modelDefinition()
{
    var _dbManager = require('../helpers/dbManager');
    var _tableName = 'outgoingEmail';

    var _model = _dbManager.Model.extend({
        tableName: _tableName,
        uuid: true
    });

    return _dbManager.model(_tableName, _model);
}

module.exports = modelDefinition();