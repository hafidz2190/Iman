var dbManager = require('../helpers/dbManager');

var model = dbManager.Model.extend({
    tableName: 'user',
    history: historyRelatedModelHandler,
    phTransaction: phTransactionRelatedModelHandler,
    userSession: userSessionRelatedModelHandler
});

function historyRelatedModelHandler()
{
    return this.hasMany('history', 'user_id');
}

function phTransactionRelatedModelHandler()
{
    return this.hasMany('phTransaction', 'user_id');
}

function userSessionRelatedModelHandler()
{
    return this.hasMany('userSession', 'user_id');
}

module.exports = dbManager.model('user', model);