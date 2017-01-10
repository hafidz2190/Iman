var dbManager = require('../helpers/dbManager');

var model = dbManager.Model.extend({
    tableName: 'gh_transaction',
    phTransaction: phTransactionRelatedModelHandler,
    user: userRelatedModelHandler
});

function phTransactionRelatedModelHandler()
{
    return this.hasMany('phTransaction', 'gh_transaction_id');
}

function userRelatedModelHandler()
{
    return this.belongsTo('user', 'user_id');
}

module.exports = dbManager.model('ghTransaction', model);