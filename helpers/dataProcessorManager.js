function managerDefinitions() 
{
    function collectionSerializer(result)
    {
        return new Promise((resolve, reject) => {
            if(!result)
                return resolve({data: []});

            return resolve({data: result.toJSON()});
        });        
    }

    function interimCustomCallback(result, interimModelName, actualModelName, actualCollectionName, sortProperty, ascending)
    {
        var formattedResult = [];

        for(var i = 0, ii = result.data.length; i < ii; i++)
        {
            var interimObject = result.data[i];
            var actualObjects = interimObject[actualModelName];
            var formattedResultPerBatch = [];
            var formattedResultPerBatchSorted = [];

            for(var j = 0, jj = actualObjects.length; j < jj; j++)
            {
                var actualObject = {};
                actualObject = actualObjects[j];
                actualObject[interimModelName] = {};

                for(var property in interimObject)
                {
                    if(property == actualModelName || property == 'id')
                        continue;
                    
                    actualObject[interimModelName][property] = interimObject[property];
                }

                formattedResultPerBatch.push(actualObject);
            }

            formattedResultPerBatchSorted = !sortProperty ? formattedResultPerBatch : quickSort(formattedResultPerBatch, 0, formattedResultPerBatch.length - 1, sortProperty, ascending);

            for(var j = 0, jj = formattedResultPerBatchSorted.length; j < jj; j++)
                formattedResult.push(formattedResultPerBatchSorted[j]);
        }
        
        return {data: formattedResult};
    }

    function modelSerializer(result)
    {
        return new Promise((resolve, reject) => {
            if(!result)
                return resolve({data: []});

            return resolve({data: [result.toJSON()]});
        });
    }

    function quickSort(arr, left, right, property, ascending)
    {
        var len = arr.length;
        var pivot;
        var partitionIndex;

        if(left < right)
        {
            pivot = right;
            partitionIndex = quickSortPartition(arr, pivot, left, right, property, ascending);
            
            //sort left and right
            quickSort(arr, left, partitionIndex - 1, property, ascending);
            quickSort(arr, partitionIndex + 1, right, property, ascending);
        }

        return arr;
    }

    function quickSortPartition(arr, pivot, left, right, property, ascending)
    {
        var pivotValue = !property ? arr[pivot] : arr[pivot][property];
        var partitionIndex = left;

        for(var i = left; i < right; i++)
        {
            var currentValue = !property ? arr[i] : arr[i][property];

            if(ascending && currentValue < pivotValue || !ascending && currentValue >= pivotValue)
            {
                quickSortSwap(arr, i, partitionIndex);
                partitionIndex++;
            }
        }

        quickSortSwap(arr, right, partitionIndex);

        return partitionIndex;
    }

    function quickSortSwap(arr, i, j)
    {
        var temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }

    return {
        collectionSerializer: collectionSerializer,
        interimCustomCallback: interimCustomCallback,
        modelSerializer: modelSerializer
    };
}

module.exports = managerDefinitions();