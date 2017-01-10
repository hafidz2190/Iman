function modelDefinitions()
{
    return {
        dropdown: require('./dropdownModel'),
        dropdownCollection: require('./dropdownCollection'),
        entity: require('./entityModel'),
        property: require('./propertyModel'),
        propertyCollection: require('./propertyCollection'),
        transaction: require('./transactionModel'),
        transactionCollection: require('./transactionCollection'),
        user: require('./userModel'),
        userSession: require('./userSessionModel'),
        userSessionCollection: require('./userSessionCollection'),
        workflowStatus: require('./workflowStatusModel'),
        workflowStatusCollection: require('./workflowStatusCollection'),
    };
}

module.exports = modelDefinitions();