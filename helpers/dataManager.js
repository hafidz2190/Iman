var mapperMap = require('../mappers/index');
var modelMap = require('../models/index');

function managerDefinitions() 
{
    function fetchAll(tableName, callback)
    {
        return mapperMap[tableName].fetchAll().then(modelMapper).then(callback);

        function modelMapper(result)
        {
            return new Promise((resolve, reject) => {
                var rows = result.models;
                var propertyMap = new modelMap[tableName]();
                var models = [];

                for(var i = 0, ii = rows.length; i < ii; i++)
                {
                    var row = rows[i];
                    var model = new modelMap[tableName]();

                    for(var key in propertyMap)
                        model[key] = row.attributes[key];

                    models.push(model);
                }

                return resolve(models);
            });
        }
    }

    function fetch(tableName, modelObject, callback)
    {
        return new mapperMap[tableName](modelObject).fetch().then(modelMapper).then(callback);

        function modelMapper(result)
        {
            return new Promise((resolve, reject) => {
                if(!result)
                    return resolve([]);

                var row = result;
                var propertyMap = new modelMap[tableName]();
                var model = new modelMap[tableName]();

                for(var key in propertyMap)
                    model[key] = row.attributes[key];

                return resolve([model]);
            });
        }
    }

    return {
        fetchAll: fetchAll,
        fetch: fetch
    };
}

module.exports = managerDefinitions();