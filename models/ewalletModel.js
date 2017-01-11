var dbManager = require('../helpers/dbManager');

var model = dbManager.Model.extend({
    tableName: 'ewallet',
    phTransaction: phTransactionRelatedModelHandler,
    user: userRelatedModelHandler
});

function phTransactionRelatedModelHandler()
{
    return this.belongsTo('phTransaction', 'ph_transaction_id');
}

function userRelatedModelHandler()
{
    return this.belongsTo('user', 'user_id').through('phTransaction', 'ph_transaction_id');
}

module.exports = dbManager.model('ewallet', model);