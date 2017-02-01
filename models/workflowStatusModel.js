function modelDefinition()
{
    var _dbManager = require('../helpers/dbManager');
    var _tableName = 'workflowStatus';

    var _model = _dbManager.Model.extend({
        tableName: _tableName,
        uuid: true,
        uuid: true,
        property: propertyRelatedModelHandler
    });

    function propertyRelatedModelHandler()
    {
        return this.belongsTo('property', 'property_id');
    }

    return _dbManager.model(_tableName, _model);
}

module.exports = modelDefinition();