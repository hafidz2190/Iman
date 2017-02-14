function modelDefinition()
{
    var _dbManager = requireLocal('helpers/dbManager');
    
    var _modelName = 'property';
    var _tableName = 's_property';

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
        return this.hasMany('dropdown', 's_property_id');
    }

    function entityRelatedModelHandler()
    {
        return this.belongsTo('entity', 's_entity_id');
    }

    function historyRelatedModelHandler()
    {
        return this.hasMany('history', 's_property_id');
    }

    function workflowStatusRelatedModelHandler()
    {
        return this.hasMany('workflowStatus', 's_property_id');
    }

    return _dbManager.model(_modelName, _model);
}

module.exports = modelDefinition();