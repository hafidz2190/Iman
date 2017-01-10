var dbManager = require('../helpers/dbManager');

var model = dbManager.Model.extend({
    tableName: 'entity',
    property: propertyRelatedModelHandler
});

function propertyRelatedModelHandler()
{
    return this.hasMany('property', 'entity_id');
}

module.exports = dbManager.model('entity', model);