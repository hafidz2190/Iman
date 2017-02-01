function modelDefinition()
{
    var _dbManager = require('../helpers/dbManager');
    var _modelName = 'ewallet';
    var _tableName = 'b_ewallet';

    var _model = _dbManager.Model.extend({
        tableName: _tableName,
        uuid: true,
        phTransaction: phTransactionRelatedModelHandler,
        user: userRelatedModelHandler
    });

    function phTransactionRelatedModelHandler()
    {
        return this.belongsTo('phTransaction', 'b_ph_transaction_id');
    }

    function userRelatedModelHandler()
    {
        return this.belongsTo('user', 's_user_id').through('phTransaction', 'b_ph_transaction_id');
    }

    return _dbManager.model(_modelName, _model);
}

module.exports = modelDefinition();