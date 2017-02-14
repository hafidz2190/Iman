function stringManager() 
{
    var _randomstring = require('randomstring');

    function formatString(str, params)
    {
        if(!params)
            return str;

        for(var i = 0, ii = params.length; i < ii; i++)
            str = str.replace('{{{' + i + '}}}', params[i]);

        return str;
    }

    function generateRandomString(length)
    {
        return _randomstring.generate(length);
    }

    return {
        formatString: formatString,
        generateRandomString: generateRandomString
    }
}

module.exports = stringManager();