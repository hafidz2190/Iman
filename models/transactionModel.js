var dbManager = require('../helpers/dbManager');

var model = dbManager.Model.extend({
    tableName: 'transaction',
    transactionType: transactionTypeRelatedModelHandler,
    user: userRelatedModelHandler
});

function transactionTypeRelatedModelHandler()
{
    return this.belongsTo('transactionType', 'transactiontype_id');
}

function userRelatedModelHandler()
{
    return this.belongsTo('user', 'user_id');
}

module.exports = dbManager.model('transaction', model);