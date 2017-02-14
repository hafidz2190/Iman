main();

function main()
{
    global.rooDirectory = __dirname;
    global.requireLocal = require('app-root-path').require;

    var _bodyParser = require('body-parser');
    var _cookieParser = require('cookie-parser');
    var _express = require('express');

    var _appConfig = requireLocal('config.json');
    var _scheduleManager = requireLocal('business/scheduleManager');
    var _userRouter = requireLocal('routers/userRouter');

    var _app = _express();
    var _port = _appConfig.port;

    _app.use(_bodyParser.urlencoded({extended: true}));
    _app.use(_bodyParser.json());
    _app.use(_cookieParser());
    _app.use(allowCors);

    _app.use('/user', _userRouter);
    _app.use(errorHandler);

    _app.listen(_port, listenCallback);

    _scheduleManager.start('sendEmail');

    function listenCallback()
    {
        console.log('iman app listening on port ' + _port);
    }

    function allowCors(req, res, next)
    {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
        res.header('Access-Control-Allow-Credentials', true);
        next();
    }

    function errorHandler(err, req, res, next)
    {
        res.status(500);
        res.send({message: err.message, stack: err.stack});
    }
}