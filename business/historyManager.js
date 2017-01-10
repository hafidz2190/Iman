var dataManager = require('../helpers/dataManager');

function managerDefinitions() 
{
    function getHistoryCollectionByPropertyAndUser(data)
    {
        var modelName = 'historyCollection';
        var relatedTableNames = ['property', 'user'];
        var forger = null;
        var filterMap = {where: {property_id: data.property_id, user_id: data.user_id}};
        var sortDescriptions = [{field: 'date', direction: 'desc'}];
        var pageSize = null;

        return dataManager.fetchWithRelated(modelName, relatedTableNames, forger, filterMap, sortDescriptions, pageSize);
    }

    return {
        getHistoryCollectionByPropertyAndUser: getHistoryCollectionByPropertyAndUser
    };
}

module.exports = managerDefinitions();