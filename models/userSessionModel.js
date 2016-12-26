var dbManager = require('../helpers/dbManager');

var model = dbManager.Model.extend({
    tableName: 'userSession',
    user: userRelatedModelHandler
});

function userRelatedModelHandler()
{
    return this.belongsTo('user', 'user_id');
}

module.exports = dbManager.model('userSession', model);