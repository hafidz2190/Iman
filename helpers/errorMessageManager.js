function managerDefinitions() 
{
    var errorMessageMap = {};

    errorMessageMap.global = {};
    errorMessageMap.global.sessionInvalid = 'User session invalid.';

    errorMessageMap.userManager = {};
    errorMessageMap.userManager.emailIsNull = 'Email is required.';
    errorMessageMap.userManager.passwordIsNull = 'Password is required.';
    errorMessageMap.userManager.emailExist = 'Email already exist.';
    errorMessageMap.userManager.emailNotExist = 'Email not exist.';
    errorMessageMap.userManager.wrongPassword = 'Wrong password.';

    return errorMessageMap;
}

module.exports = managerDefinitions();