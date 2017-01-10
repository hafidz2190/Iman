var dbManager = require('../helpers/dbManager');

var model = dbManager.Model.extend({
    tableName: 'ph_transaction',
    ghTransaction: ghTransactionRelatedModelHandler,
    user: userRelatedModelHandler
});

function ghTransactionRelatedModelHandler()
{
    return this.belongsTo('ghTransaction', 'gh_transaction_id');
}

function userRelatedModelHandler()
{
    return this.belongsTo('user', 'user_id');
}

module.exports = dbManager.model('phTransaction', model);