var dbManager = require('../helpers/dbManager');

var model = dbManager.Model.extend({
    tableName: 'manager_test',
    uuid: true,
    user: userRelatedModelHandler
});

function userRelatedModelHandler()
{
    return this.belongsTo('user', 'user_id');
}

module.exports = dbManager.model('managerTest', model);