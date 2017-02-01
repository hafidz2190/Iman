function entityManager() 
{
    var _dataManager = require('../helpers/dataManager');

    function getEntityByName(entityName, transactionScope)
    {
        return _dataManager.fetch('entity', {name: entityName}, transactionScope);
    }

    function getPropertyCollectionByEntityId(entityId, transactionScope)
    {
        return _dataManager.fetchWithRelated('propertyCollection', ['entity'], {where: {entity_id: entityId}}, null, null, null, transactionScope);
    }

    return {
        getEntityByName: getEntityByName,
        getPropertyCollectionByEntityId: getPropertyCollectionByEntityId,
    };
}

module.exports = entityManager();