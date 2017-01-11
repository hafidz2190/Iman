var dbManager = require('../helpers/dbManager');

var model = dbManager.Model.extend({
    tableName: 'user',
    ewallet: ewalletRelatedModelHandler,
    history: historyRelatedModelHandler,
    phTransaction: phTransactionRelatedModelHandler,
    userSession: userSessionRelatedModelHandler
});

function ewalletRelatedModelHandler()
{
    return this.hasMany('ewallet', 'ph_transaction_id').through('phTransaction', 'user_id');
}

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