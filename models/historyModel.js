function modelDefinition()
{
    var _dbManager = require('../helpers/dbManager');
    var _modelName = 'history';
    var _tableName = 's_history';

    var _model = _dbManager.Model.extend({
        tableName: _tableName,
        uuid: true,
        property: propertyRelatedModelHandler,
        user: userRelatedModelHandler,
    });

    function propertyRelatedModelHandler()
    {
        return this.belongsTo('property', 's_property_id');
    }

    function userRelatedModelHandler()
    {
        return this.belongsTo('user', 's_user_id');
    }

    return _dbManager.model(_modelName, _model);
}

module.exports = modelDefinition();