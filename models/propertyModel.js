var dbManager = require('../helpers/dbManager');

var model = dbManager.Model.extend({
    tableName: 'property',
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

module.exports = dbManager.model('property', model);