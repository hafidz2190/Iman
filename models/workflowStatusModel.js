function modelDefinition()
{
    var _dbManager = require('../helpers/dbManager');
    var _modelName = 'workflowStatus';
    var _tableName = 's_workflow_status';

    var _model = _dbManager.Model.extend({
        tableName: _tableName,
        uuid: true,
        uuid: true,
        property: propertyRelatedModelHandler
    });

    function propertyRelatedModelHandler()
    {
        return this.belongsTo('property', 's_property_id');
    }

    return _dbManager.model(_modelName, _model);
}

module.exports = modelDefinition();