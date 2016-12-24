function managerDefinitions()
{
    return {
        credentialManager: require('./credentialManager'),
        userManager: require('./userManager')
    };
}

module.exports = managerDefinitions();