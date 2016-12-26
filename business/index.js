function managerDefinitions()
{
    return {
        credentialManager: require('./credentialManager'),
        transactionManager: require('./transactionManager'),
        userManager: require('./userManager')
    };
}

module.exports = managerDefinitions();