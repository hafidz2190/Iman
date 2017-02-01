var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var appConfig = require('./config.json');

var userRouter = require('./routers/userRouter');

var app = express();
var port = appConfig.server.port;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(allowCors);

app.use('/user', userRouter);
app.use(errorHandler);

app.listen(port, listenCallback);

function listenCallback()
{
    console.log('iman app listening on port ' + port);
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
    res.send(err.stack);
}