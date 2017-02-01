function modelDefinition()
{
    var _dbManager = require('../helpers/dbManager');
    var _tableName = 'property';

    var _model = _dbManager.Model.extend({
        tableName: _tableName,
        uuid: true,
        dropdown: dropdownRelatedModelHandler,
        entity: entityRelatedModelHandler,
        history: historyRelatedModelHandler,
        workflowStatus: workflowStatusRelatedModelHandler
    });

    function dropdownRelatedModelHandler()
    {
        return this.hasMany('dropdown', 'property_id');
    }

    function entityRelatedModelHandler()
    {
        return this.belongsTo('entity', 'entity_id');
    }

    function historyRelatedModelHandler()
    {
        return this.hasMany('history', 'property_id');
    }

    function workflowStatusRelatedModelHandler()
    {
        return this.hasMany('workflowStatus', 'property_id');
    }

    return _dbManager.model(_tableName, _model);
}

module.exports = modelDefinition();