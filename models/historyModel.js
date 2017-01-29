var dbManager = require('../helpers/dbManager');

var model = dbManager.Model.extend({
    tableName: 'history',
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

module.exports = dbManager.model('history', model);