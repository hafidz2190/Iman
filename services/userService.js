function userService() 
{
    var _userManager = require('../business/userManager');

    function registerUserService(data)
    {
        return _userManager.registerUserService(data);
    }

    function getUserService(data)
    {
        return _userManager.getUserService(data);
    }

    function updateUserService(data)
    {
        return _userManager.updateUserService(data);
    }

    function getCredentialService(data)
    {
        return _userManager.getCredentialService(data);
    }

    return {
        registerUserService: registerUserService,
        getUserService: getUserService,
        updateUserService: updateUserService,
        getCredentialService: getCredentialService
    };
}

module.exports = userService();