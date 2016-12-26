var serializerManager = require('./serializerManager');
var modelMap = require('../models/index');

function managerDefinitions() 
{
    function fetch(tableName, filterMap, callback)
    {
        return new modelMap[tableName](filterMap).fetch().then(serializer).then(callback);

        function serializer(result)
        {
            return new Promise((resolve, reject) => {
                if(!result)
                    return resolve([]);

                return resolve(serializerManager.serialize(result.attributes));
            });
        }
    }

    function fetchWithRelated(tableName, relatedTableNames, forger, filterMap, sortDescriptions, pageSize, callback)
    {
        return new modelMap[tableName](forger).query(filterMap).query(orderByHandler).query(limitHandler).fetch({withRelated: relatedTableNames}).then(serializer).then(callback);

        function serializer(result)
        {
            return new Promise((resolve, reject) => {
                if(!result)
                    return resolve([]);

                return resolve(serializerManager.serializeArray(result.models));
            });
        }

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

    return {
        fetch: fetch,
        fetchWithRelated: fetchWithRelated
    };
}

module.exports = managerDefinitions();