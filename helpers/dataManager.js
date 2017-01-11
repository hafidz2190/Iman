var dataProcessorManager = require('./dataProcessorManager');
var modelMap = require('../models/index');

function managerDefinitions() 
{
    function fetch(modelName, filterMap, callback)
    {
        return new modelMap[modelName](filterMap)
            .fetch()
            .then(dataProcessorManager.modelSerializer)
            .then(callback ? callback : defaultCallback);
    }

    function fetchAll(modelName, sortDescriptions, pageSize, callback)
    {
        return new modelMap[modelName]()
            .query(orderByHandler)
            .query(limitHandler)
            .fetchAll()
            .then(dataProcessorManager.collectionSerializer)
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

    function fetchWithRelated(modelName, relatedTableNames, forger, filterMap, sortDescriptions, pageSize, callback)
    {
        return new modelMap[modelName](forger)
            .query(filterMap)
            .query(orderByHandler)
            .query(limitHandler)
            .fetch({withRelated: relatedTableNames})
            .then(dataProcessorManager.collectionSerializer)
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