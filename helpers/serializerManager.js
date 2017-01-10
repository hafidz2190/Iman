function managerDefinitions() 
{
    function modelSerializer(result)
    {
        return new Promise((resolve, reject) => {
            if(!result)
                return resolve({data: []});

            return resolve({data: serialize(result.attributes)});
        });        
    }

    function collectionSerializer(result)
    {
        return new Promise((resolve, reject) => {
            if(!result)
                return resolve({data: []});

            return resolve({data: serializeArray(result.models)});
        });        
    }    

    function serialize(data)
    {
        var serializedData = {};

        for(var key in data)
            serializedData[key] = data[key];

        return [serializedData];
    }

    function serializeArray(data)
    {
        var serializedResults = [];

        if(!data)
            return serializedResults;

        for(var i = 0, ii = data.length; i < ii; i++)
        {
            var serializedData = {};
            var key = undefined;
            var key2 = undefined;
            var key3 = undefined;

            for(key in data[i].attributes)
                serializedData[key] = data[i].attributes[key];
            
            for(key2 in data[i].relations)
                for(key3 in data[i].relations[key2].attributes)
                    serializedData[key2 + '.' + key3] = data[i].relations[key2].attributes[key3];

            serializedResults.push(serializedData);
        }

        return serializedResults;
    }

    return {
        modelSerializer: modelSerializer,
        collectionSerializer: collectionSerializer
    };
}

module.exports = managerDefinitions();