function managerDefinitions()
{
    return {
        entityManager: require('./entityManager'),
        transactionManager: require('./transactionManager'),
        userManager: require('./userManager')
    };
}

module.exports = managerDefinitions();