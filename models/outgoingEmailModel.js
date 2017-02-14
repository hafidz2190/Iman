function modelDefinition()
{
    var _dbManager = requireLocal('helpers/dbManager');
    
    var _modelName = 'outgoingEmail';
    var _tableName = 's_outgoing_email';

    var _model = _dbManager.Model.extend({
        tableName: _tableName,
        uuid: true
    });

    return _dbManager.model(_modelName, _model);
}

module.exports = modelDefinition();