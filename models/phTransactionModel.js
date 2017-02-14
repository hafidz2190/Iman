function modelDefinition()
{
    var _dbManager = requireLocal('helpers/dbManager');
    
    var _modelName = 'phTransaction';
    var _tableName = 'b_phTransaction';

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
        return this.hasMany('ewallet', 'b_ph_transaction_id');
    }

    function ghTransactionRelatedModelHandler()
    {
        return this.belongsTo('ghTransaction', 'b_gh_transaction_id');
    }

    function taskRelatedModelHandler()
    {
        return this.hasMany('task', 'b_ph_transaction_id');
    }

    function userRelatedModelHandler()
    {
        return this.belongsTo('user', 's_user_id');
    }

    return _dbManager.model(_modelName, _model);
}

module.exports = modelDefinition();