function encryptionManager() 
{
    var _bcrypt = require('bcryptjs');
    
    var _appConfig = requireLocal('config.json');

    var _saltRounds = parseInt(_appConfig.saltRounds);

    function compareHash(text, hash)
    {
        return new Promise((resolve, reject) =>
        {
            _bcrypt.compare(text, hash, function(error, result)
            {
                if(error)
                    return reject(error);
                
                return resolve(result);
            });
        });
    }

    function generateHash(text)
    {
        return new Promise((resolve, reject) =>
        {
            _bcrypt.hash(text, _saltRounds, function(error, result)
            {
                if(error)
                    return reject(error);
                
                return resolve(result);
            })
        });
    }

    return {
        compareHash: compareHash,
        generateHash: generateHash
    };
}

module.exports = encryptionManager();