var dbManager = require('../helpers/dbManager');

var model = dbManager.Model.extend({
    tableName: 'ph_transaction',
    ewallet: ewalletRelatedModelHandler,
    ghTransaction: ghTransactionRelatedModelHandler,
    user: userRelatedModelHandler
});

function ewalletRelatedModelHandler()
{
    return this.hasMany('ewallet', 'ph_transaction_id');
}

function ghTransactionRelatedModelHandler()
{
    return this.belongsTo('ghTransaction', 'gh_transaction_id');
}

function userRelatedModelHandler()
{
    return this.belongsTo('user', 'user_id');
}

module.exports = dbManager.model('phTransaction', model);