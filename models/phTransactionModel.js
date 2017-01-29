var dbManager = require('../helpers/dbManager');

var model = dbManager.Model.extend({
    tableName: 'ph_transaction',
    uuid: true,
    ewallet: ewalletRelatedModelHandler,
    ghTransaction: ghTransactionRelatedModelHandler,
    task: taskRelatedModelHandler,
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

function taskRelatedModelHandler()
{
    return this.hasMany('task', 'ph_transaction_id');
}

function userRelatedModelHandler()
{
    return this.belongsTo('user', 'user_id');
}

module.exports = dbManager.model('phTransaction', model);