function modelDefinition()
{
    var _dbManager = require('../helpers/dbManager');
    var _tableName = 'user_session';

    var _model = _dbManager.Model.extend({
        tableName: _tableName,
        uuid: true,
        user: userRelatedModelHandler
    });

    function userRelatedModelHandler()
    {
        return this.belongsTo('user', 'user_id');
    }

    return _dbManager.model(_tableName, _model);
}

module.exports = modelDefinition();