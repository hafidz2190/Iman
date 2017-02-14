function userService() 
{
    var _userManager = requireLocal('business/userManager');

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

    function requestResetPasswordService(data)
    {
        return _userManager.requestResetPasswordService(data);
    }

    function resetPasswordService(data)
    {
        return _userManager.resetPasswordService(data);
    }

    function verifyAccountService(data)
    {
        return _userManager.verifyAccountService(data);
    }

    return {
        registerUserService: registerUserService,
        getUserService: getUserService,
        updateUserService: updateUserService,
        getCredentialService: getCredentialService,
        requestResetPasswordService: requestResetPasswordService,
        resetPasswordService: resetPasswordService,
        verifyAccountService: verifyAccountService
    };
}

module.exports = userService();