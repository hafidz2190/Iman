function indexManager()
{
    return {
        dropdown: requireLocal('models/dropdownModel'),
        dropdownCollection: requireLocal('models/dropdownCollection'),
        entity: requireLocal('models/entityModel'),
        ewallet: requireLocal('models/ewalletModel'),
        ewalletCollection: requireLocal('models/ewalletCollection'),
        ghTransaction: requireLocal('models/ghTransactionModel'),
        ghTransactionCollection: requireLocal('models/ghTransactionCollection'),
        history: requireLocal('models/historyModel'),
        historyCollection: requireLocal('models/historyCollection'),
        managerTest: requireLocal('models/managerTestModel'),
        managerTestCollection: requireLocal('models/managerTestCollection'),
        outgoingEmail: requireLocal('models/outgoingEmailModel'),
        outgoingEmailCollection: requireLocal('models/outgoingEmailCollection'),
        phTransaction: requireLocal('models/phTransactionModel'),
        phTransactionCollection: requireLocal('models/phTransactionCollection'),
        property: requireLocal('models/propertyModel'),
        propertyCollection: requireLocal('models/propertyCollection'),
        task: requireLocal('models/taskModel'),
        taskCollection: requireLocal('models/taskCollection'),
        user: requireLocal('models/userModel'),
        userSession: requireLocal('models/userSessionModel'),
        userSessionCollection: requireLocal('models/userSessionCollection'),
        workflowStatus: requireLocal('models/workflowStatusModel'),
        workflowStatusCollection: requireLocal('models/workflowStatusCollection'),
    };
}

module.exports = indexManager();