var dbManager = require('../helpers/dbManager');

var model = dbManager.Model.extend({
    tableName: 'transaction',
    user: userRelatedModelHandler
});

function userRelatedModelHandler()
{
    return this.belongsTo('user', 'user_id');
}

module.exports = dbManager.model('transaction', model);