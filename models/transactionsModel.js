var dbManager = require('../helpers/dbManager');
var transactionModel = require('./transactionModel');

var model = dbManager.Collection.extend({
    model: transactionModel
});

module.exports = model;