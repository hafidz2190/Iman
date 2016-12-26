var dbManager = require('../helpers/dbManager');

var model = dbManager.Model.extend({
    tableName: 'user',
    userSession: userSessionRelatedModelHandler
});

function userSessionRelatedModelHandler()
{
    return this.hasMany('userSession', 'user_id');
}

module.exports = dbManager.model('user', model);