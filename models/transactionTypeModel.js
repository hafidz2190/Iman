var dbManager = require('../helpers/dbManager');

var model = dbManager.Model.extend({
    tableName: 'transactionType',
    transaction: transactionRelatedModelHandler
});

function transactionRelatedModelHandler()
{
    return this.hasMany('transaction', 'transactiontype_id');
}

module.exports = dbManager.model('transactionType', model);