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

    function modelSerializer(result)
    {
        return new Promise((resolve, reject) => {
            if(!result)
                return resolve({data: []});

            return resolve({data: [result.toJSON()]});
        });
    }

    function quickSort(arr, left, right, property)
    {
        var len = arr.length;
        var pivot;
        var partitionIndex;

        if(left < right)
        {
            pivot = right;
            partitionIndex = quickSortPartition(arr, pivot, left, right, property);
            
            //sort left and right
            quickSort(arr, left, partitionIndex - 1, property);
            quickSort(arr, partitionIndex + 1, right, property);
        }

        return arr;
    }

    function quickSortPartition(arr, pivot, left, right, property)
    {
        var pivotValue = !property ? arr[pivot] : arr[pivot][property];
        var partitionIndex = left;

        for(var i = left; i < right; i++)
        {
            var currentValue = !property ? arr[i] : arr[i][property];
            if(currentValue < pivotValue)
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
        modelSerializer: modelSerializer,
        quickSort: quickSort
    };
}

module.exports = managerDefinitions();