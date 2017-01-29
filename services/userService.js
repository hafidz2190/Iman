var userManager = require('../business/userManager');

function serviceDefinitions() 
{
    function createUserService(data)
    {
        return userManager.createUserService(data);
    }

    function getUserService(data)
    {
        return userManager.getUserService(data);
    }

    function getCredentialService(data)
    {
        return userManager.getCredentialService(data);
    }

    return {
        createUserService: createUserService,
        getUserService: getUserService,
        getCredentialService: getCredentialService
    };
}

module.exports = serviceDefinitions();