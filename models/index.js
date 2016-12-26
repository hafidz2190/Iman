function modelDefinitions()
{
    return {
        transaction: require('./transactionModel'),
        transactions: require('./transactionsModel'),
        transactionType: require('./transactionTypeModel'),
        user: require('./userModel'),
        userSession: require('./userSessionModel'),
        userSessions: require('./userSessionsModel')
    };
}

module.exports = modelDefinitions();