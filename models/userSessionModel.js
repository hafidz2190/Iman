var dbManager = require('../helpers/dbManager');

var model = dbManager.Model.extend({
    tableName: 'user_session',
    uuid: true,
    user: userRelatedModelHandler
});

function userRelatedModelHandler()
{
    return this.belongsTo('user', 'user_id');
}

module.exports = dbManager.model('userSession', model);