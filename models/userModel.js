var dbManager = require('../helpers/dbManager');

var model = dbManager.Model.extend({
    tableName: 'user',
    transaction: transactionRelatedModelHandler,
    userSession: userSessionRelatedModelHandler
});

function transactionRelatedModelHandler()
{
    return this.hasMany('transaction', 'user_id');
}

function userSessionRelatedModelHandler()
{
    return this.hasMany('userSession', 'user_id');
}

module.exports = dbManager.model('user', model);