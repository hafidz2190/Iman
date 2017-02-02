function errorMessageManager() 
{
    var _errorMessageMap = {};

    _errorMessageMap.entity = {};
    _errorMessageMap.entity.illegalEntity = 'Illegal entity {0}.';
    _errorMessageMap.entity.illegalProperty = 'Illegal property {0} in entity {1}.';
    _errorMessageMap.entity.notAuthorized = 'You are not authorized to modify this record.';
    _errorMessageMap.entity.propertyIsRequired = 'Property {0} is required.';
    _errorMessageMap.entity.recordNotExist = 'The record that you are trying to store is not exist.';
    _errorMessageMap.entity.versionInvalid = 'The record that you are trying to store has been modified.';

    _errorMessageMap.user = {};
    _errorMessageMap.user.emailExist = 'Email already exist.';
    _errorMessageMap.user.emailNotExist = 'Email not exist.';
    _errorMessageMap.user.userNotExist = 'User not exist.';
    _errorMessageMap.user.wrongPassword = 'Wrong password.';

    _errorMessageMap.userSession = {};
    _errorMessageMap.userSession.sessionInvalid = 'User session invalid.';

    function formatError(errorMessage, params)
    {
        if(!params)
            return errorMessage;

        for(var i = 0, ii = params.length; i < ii; i++)
            errorMessage = errorMessage.replace('{' + i + '}', params[i]);

        return errorMessage;
    }

    function propertyIsRequired(propertyName)
    {
        return formatError(_errorMessageMap.entity.propertyIsRequired, [propertyName]);
    }

    return {
        errorMessageMap: _errorMessageMap,
        formatError: formatError,
        propertyIsRequired: propertyIsRequired
    }
}

module.exports = errorMessageManager();