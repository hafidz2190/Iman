var dataManager = require('../helpers/dataManager');
var cron = require('cron');

function managerDefinitions() 
{
    function startOutgoingEmailSchedule()
    {
    }

    function stopOutgoingEmailSchedule()
    {
    }

    return {
        startOutgoingEmailSchedule: startOutgoingEmailSchedule,
        stopOutgoingEmailSchedule: stopOutgoingEmailSchedule,
    };
}

module.exports = managerDefinitions();