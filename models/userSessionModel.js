function modelDefinition()
{
    var _dbManager = require('../helpers/dbManager');
    var _modelName = 'userSession';
    var _tableName = 's_user_session';

    var _model = _dbManager.Model.extend({
        tableName: _tableName,
        uuid: true,
        user: userRelatedModelHandler
    });

    function userRelatedModelHandler()
    {
        return this.belongsTo('user', 's_user_id');
    }

    return _dbManager.model(_modelName, _model);
}

module.exports = modelDefinition();