function managerDefinitions()
{
    return {
        entityManager: require('./entityManager'),
        historyManager: require('./historyManager'),
        transactionManager: require('./transactionManager'),
        userManager: require('./userManager')
    };
}

module.exports = managerDefinitions();