var express = require('express');
var bodyParser = require('body-parser');
var appConfig = require('./config.json');

var credentialService = require('./services/credentialService');
var transactionService = require('./services/transactionService');
var userService = require('./services/userService');

var app = express();
var port = appConfig.server.port;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/credential', credentialService);
app.use('/transaction', transactionService);
app.use('/user', userService);

app.listen(port, listenCallback);

function listenCallback()
{
    console.log('iman app listening on port ' + port);
}