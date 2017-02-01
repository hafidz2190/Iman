function modelDefinition()
{
    var _dbManager = require('../helpers/dbManager');
    var _modelName = 'entity';
    var _tableName = 's_entity';

    var _model = _dbManager.Model.extend({
        tableName: _tableName,
        uuid: true,
        property: propertyRelatedModelHandler
    });

    function propertyRelatedModelHandler()
    {
        return this.hasMany('property', 's_entity_id');
    }
    
    return _dbManager.model(_modelName, _model);
}

module.exports = modelDefinition();