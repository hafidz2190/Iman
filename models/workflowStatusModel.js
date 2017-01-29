var dbManager = require('../helpers/dbManager');

var model = dbManager.Model.extend({
    tableName: 'workflow_status',
    uuid: true,
    property: propertyRelatedModelHandler
});

function propertyRelatedModelHandler()
{
    return this.belongsTo('property', 'property_id');
}

module.exports = dbManager.model('workflowStatus', model);