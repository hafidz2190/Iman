function modelDefinition()
{
    var _dbManager = require('../helpers/dbManager');
    var _tableName = 'ewallet';

    var _model = _dbManager.Model.extend({
        tableName: _tableName,
        uuid: true,
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

    return _dbManager.model(_tableName, _model);
}

module.exports = modelDefinition();