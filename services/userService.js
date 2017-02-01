function userService() 
{
    var _userManager = require('../business/userManager');
    
    function createUserService(data)
    {
        return _userManager.createUserService(data);
    }

    function getUserService(data)
    {
        return _userManager.getUserService(data);
    }

    function getCredentialService(data)
    {
        return _userManager.getCredentialService(data);
    }

    return {
        createUserService: createUserService,
        getUserService: getUserService,
        getCredentialService: getCredentialService
    };
}

module.exports = userService();