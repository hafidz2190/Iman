function indexManager()
{
    return {
        dropdown: require('./dropdownModel'),
        dropdownCollection: require('./dropdownCollection'),
        entity: require('./entityModel'),
        ewallet: require('./ewalletModel'),
        ewalletCollection: require('./ewalletCollection'),
        ghTransaction: require('./ghTransactionModel'),
        ghTransactionCollection: require('./ghTransactionCollection'),
        history: require('./historyModel'),
        historyCollection: require('./historyCollection'),
        managerTest: require('./managerTestModel'),
        managerTestCollection: require('./managerTestCollection'),
        outgoingEmail: require('./outgoingEmailModel'),
        outgoingEmailCollection: require('./outgoingEmailCollection'),
        phTransaction: require('./phTransactionModel'),
        phTransactionCollection: require('./phTransactionCollection'),
        property: require('./propertyModel'),
        propertyCollection: require('./propertyCollection'),
        task: require('./taskModel'),
        taskCollection: require('./taskCollection'),
        user: require('./userModel'),
        userSession: require('./userSessionModel'),
        userSessionCollection: require('./userSessionCollection'),
        workflowStatus: require('./workflowStatusModel'),
        workflowStatusCollection: require('./workflowStatusCollection'),
    };
}

module.exports = indexManager();