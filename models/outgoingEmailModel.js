var dbManager = require('../helpers/dbManager');

var model = dbManager.Model.extend({
    tableName: 'outgoing_email',
    uuid: true
});

module.exports = dbManager.model('outgoingEmail', model);