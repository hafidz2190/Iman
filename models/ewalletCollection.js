var dbManager = require('../helpers/dbManager');
var model = require('./ewalletModel');

var collection = dbManager.Collection.extend({
    model: model
});

module.exports = collection;