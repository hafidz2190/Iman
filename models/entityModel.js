function modelDefinition()
{
    var _dbManager = require('../helpers/dbManager');
    var _tableName = 'entity';

    var _model = _dbManager.Model.extend({
        tableName: _tableName,
        uuid: true,
        property: propertyRelatedModelHandler
    });

    function propertyRelatedModelHandler()
    {
        return this.hasMany('property', 'entity_id');
    }
    
    return _dbManager.model(_tableName, _model);
}

module.exports = modelDefinition();