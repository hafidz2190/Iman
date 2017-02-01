function modelDefinition()
{
    var _dbManager = require('../helpers/dbManager');
    var _modelName = 'ghTransaction';
    var _tableName = 'b_gh_transaction';

    var _model = _dbManager.Model.extend({
        tableName: _tableName,
        uuid: true,
        phTransaction: phTransactionRelatedModelHandler,
        user: userRelatedModelHandler
    });

    function phTransactionRelatedModelHandler()
    {
        return this.hasMany('phTransaction', 'b_gh_transaction_id');
    }

    function userRelatedModelHandler()
    {
        return this.belongsTo('user', 's_user_id');
    }

    return _dbManager.model(_modelName, _model);
}

module.exports = modelDefinition();