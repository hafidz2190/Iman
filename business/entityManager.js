var dataManager = require('../helpers/dataManager');

function managerDefinitions() 
{
    function getDropdownCollectionByProperty(data)
    {
        var modelName = 'dropdownCollection';
        var relatedTableNames = ['property'];
        var forger = null;
        var filterMap = {where: {property_id: data.property_id}};
        var sortDescriptions = [{field: 'index', direction: 'asc'}];
        var pageSize = null;

        return dataManager.fetchWithRelated(modelName, relatedTableNames, forger, filterMap, sortDescriptions, pageSize);
    }

    function getEntityCollection()
    {
        var modelName = 'entity';
        var sortDescriptions = [{field: 'name', direction: 'asc'}];
        var pageSize = null;

        return dataManager.fetchAll(modelName, sortDescriptions, pageSize);
    }
    
    function getPropertyCollectionByEntity(data)
    {
        var modelName = 'propertyCollection';
        var relatedTableNames = ['entity'];
        var forger = null;
        var filterMap = {where: {entity_id: data.entity_id}};
        var sortDescriptions = [{field: 'name', direction: 'asc'}];
        var pageSize = null;

        return dataManager.fetchWithRelated(modelName, relatedTableNames, forger, filterMap, sortDescriptions, pageSize);
    }

    function getWorkflowStatusCollectionByProperty(data)
    {
        var modelName = 'workflowStatusCollection';
        var relatedTableNames = ['property'];
        var forger = null;
        var filterMap = {where: {property_id: data.property_id}};
        var sortDescriptions = [{field: 'index', direction: 'asc'}];
        var pageSize = null;

        return dataManager.fetchWithRelated(modelName, relatedTableNames, forger, filterMap, sortDescriptions, pageSize);
    }

    return {
        getDropdownCollectionByProperty: getDropdownCollectionByProperty,
        getEntityCollection: getEntityCollection,
        getPropertyCollectionByEntity: getPropertyCollectionByEntity,
        getWorkflowStatusCollectionByProperty: getWorkflowStatusCollectionByProperty
    };
}

module.exports = managerDefinitions();