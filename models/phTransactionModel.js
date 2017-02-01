function modelDefinition()
{
    var _dbManager = require('../helpers/dbManager');
    var _tableName = 'phTransaction';

    var _model = _dbManager.Model.extend({
        tableName: _tableName,
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

    return _dbManager.model(_tableName, _model);
}

module.exports = modelDefinition();