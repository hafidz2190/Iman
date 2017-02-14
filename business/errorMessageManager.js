function errorMessageManager() 
{
    var _enumManager = requireLocal('business/enumManager');
    var _stringManager = requireLocal('helpers/stringManager');

    var _entityErrorMap =_enumManager.errorMessageMap.entity;

    function propertyIsRequired(propertyName)
    {
        return _stringManager.formatString(_entityErrorMap.propertyIsRequired, [propertyName]);
    }

    return {
        propertyIsRequired: propertyIsRequired
    }
}

module.exports = errorMessageManager();