var dataManager = require('../helpers/dataManager');

function managerDefinitions() 
{
    function getEntityByName(entityName, transactionScope)
    {
        return dataManager.fetch('entity', {name: entityName}, transactionScope);
    }

    function getPropertyCollectionByEntityId(entityId, transactionScope)
    {
        return dataManager.fetchWithRelated('propertyCollection', ['entity'], {where: {entity_id: entityId}}, null, null, null, transactionScope);
    }

    return {
        getEntityByName: getEntityByName,
        getPropertyCollectionByEntityId: getPropertyCollectionByEntityId,
    };
}

module.exports = managerDefinitions();