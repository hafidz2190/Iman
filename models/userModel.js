function modelDefinition()
{
    var _dbManager = require('../helpers/dbManager');
    var _tableName = 'user';

    var _model = _dbManager.Model.extend({
        tableName: _tableName,
        uuid: true,
        ewallet: ewalletRelatedModelHandler,
        history: historyRelatedModelHandler,
        managerTest: managerTestRelatedModelHandler,
        phTransaction: phTransactionRelatedModelHandler,
        task: taskRelatedModelHandler,
        userSession: userSessionRelatedModelHandler
    });

    function ewalletRelatedModelHandler()
    {
        return this.hasMany('ewallet', 'ph_transaction_id').through('phTransaction', 'user_id');
    }

    function historyRelatedModelHandler()
    {
        return this.hasMany('history', 'user_id');
    }

    function managerTestRelatedModelHandler()
    {
        return this.hasMany('managerTest', 'user_id');
    }

    function phTransactionRelatedModelHandler()
    {
        return this.hasMany('phTransaction', 'user_id');
    }

    function taskRelatedModelHandler()
    {
        return this.hasMany('task', 'ph_transaction_id').through('phTransaction', 'user_id');
    }

    function userSessionRelatedModelHandler()
    {
        return this.hasMany('userSession', 'user_id');
    }

    return _dbManager.model(_tableName, _model)
}

module.exports = modelDefinition();