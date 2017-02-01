function errorMessageManager() 
{
    var _errorMessageMap = {};

    _errorMessageMap.global = {};
    _errorMessageMap.global.illegalEntity = 'Illegal entity {0}.';
    _errorMessageMap.global.illegalProperty = 'Illegal property {0} in entity {1}.';
    _errorMessageMap.global.sessionInvalid = 'User session invalid.';

    _errorMessageMap.userManager = {};
    _errorMessageMap.userManager.emailExist = 'Email already exist.';
    _errorMessageMap.userManager.emailIsNull = 'Email is required.';
    _errorMessageMap.userManager.emailNotExist = 'Email not exist.';
    _errorMessageMap.userManager.passwordIsNull = 'Password is required.';
    _errorMessageMap.userManager.wrongPassword = 'Wrong password.';

    function formatError(errorMessage, params)
    {
        if(!params)
            return errorMessage;

        for(var i = 0, ii = params.length; i < ii; i++)
            errorMessage = errorMessage.replace('{' + i + '}', params[i]);

        return errorMessage;
    }

    return {
        errorMessageMap: _errorMessageMap,
        formatError: formatError
    }
}

module.exports = errorMessageManager();