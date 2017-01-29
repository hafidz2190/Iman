var dbManager = require('../helpers/dbManager');
var model = require('./outgoingEmailModel');

var collection = dbManager.Collection.extend({
    model: model
});

module.exports = collection;