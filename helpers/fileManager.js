function fileManager() 
{
    var _fs = require('fs');

    function readAllText(filePath, encoding)
    {
        return new Promise((resolve, reject) =>
        {
            _fs.readFile(filePath, encoding ? encoding : 'utf-8', (error, result) =>
            {
                if(error)
                    return reject(error);
                
                return resolve(result);
            });
        });
    }

    return {
        readAllText: readAllText
    };
}

module.exports = fileManager();