function modelDefinition()
{
    var _dbManager = require('../helpers/dbManager');
    var _tableName = 'history';

    var _model = _dbManager.Model.extend({
        tableName: _tableName,
        uuid: true,
        property: propertyRelatedModelHandler,
        user: userRelatedModelHandler,
    });

    function propertyRelatedModelHandler()
    {
        return this.belongsTo('property', 'property_id');
    }

    function userRelatedModelHandler()
    {
        return this.belongsTo('user', 'user_id');
    }

    return _dbManager.model(_tableName, _model);
}

module.exports = modelDefinition();