function modelDefinition()
{
    var _dbManager = requireLocal('helpers/dbManager');
    
    var _modelName = 'user';
    var _tableName = 's_user';

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
        return this.hasMany('ewallet', 'b_ph_transaction_id').through('phTransaction', 's_user_id');
    }

    function historyRelatedModelHandler()
    {
        return this.hasMany('history', 's_user_id');
    }

    function managerTestRelatedModelHandler()
    {
        return this.hasMany('managerTest', 's_user_id');
    }

    function phTransactionRelatedModelHandler()
    {
        return this.hasMany('phTransaction', 's_user_id');
    }

    function taskRelatedModelHandler()
    {
        return this.hasMany('task', 'b_ph_transaction_id').through('phTransaction', 's_user_id');
    }

    function userSessionRelatedModelHandler()
    {
        return this.hasMany('userSession', 's_user_id');
    }

    return _dbManager.model(_modelName, _model)
}

module.exports = modelDefinition();