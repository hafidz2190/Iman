var serializerManager = require('./serializerManager');
var modelMap = require('../models/index');

function managerDefinitions() 
{
    function fetch(modelName, filterMap, callback)
    {
        return new modelMap[modelName](filterMap)
            .fetch()
            .then(serializerManager.modelSerializer)
            .then(callback ? callback : defaultCallback);
    }

    function fetchAll(modelName, callback)
    {
        return new modelMap[modelName]()
            .fetchAll()
            .then(serializerManager.collectionSerializer)
            .then(callback ? callback : defaultCallback);
    }

    function fetchWithRelated(modelName, relatedTableNames, forger, filterMap, sortDescriptions, pageSize, callback)
    {
        return new modelMap[modelName](forger)
            .query(filterMap)
            .query(orderByHandler)
            .query(limitHandler)
            .fetch({withRelated: relatedTableNames})
            .then(serializerManager.collectionSerializer)
            .then(callback ? callback : defaultCallback);

        function orderByHandler(qb)
        {
            if(!sortDescriptions)
                return;
            
            for(var i = 0, ii = sortDescriptions.length; i < ii; i++)
                qb.orderBy(sortDescriptions[i].field, sortDescriptions[i].direction);
        }

        function limitHandler(qb)
        {
            if(!pageSize)
                return;

            qb.limit(pageSize);
        }
    }

    function defaultCallback(result)
    {
        return result;
    }

    return {
        fetch: fetch,
        fetchAll: fetchAll,
        fetchWithRelated: fetchWithRelated
    };
}

module.exports = managerDefinitions();