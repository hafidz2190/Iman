function templateManager() 
{
    var _path = require('path');

    var _appConfig = requireLocal('config.json');
    var _fileManager = requireLocal('helpers/fileManager');
    var _stringManager = requireLocal('helpers/stringManager');

    var _templateDirectory = _appConfig.templateDirectory;

    function getTemplate(templatePath)
    {
        var filePath = _path.join(rooDirectory, _templateDirectory, templatePath);

        return new Promise((resolve, reject) =>
        {
            return _fileManager.readAllText(filePath)
            .then(successCallback)
            .catch(errorCallback);

            function successCallback(result)
            {
                return resolve(result);
            }

            function errorCallback(error)
            {
                return reject(error);
            }
        });
    }

    return {
        getTemplate: getTemplate
    }
}

module.exports = templateManager();