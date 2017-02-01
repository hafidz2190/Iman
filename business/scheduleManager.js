function scheduleManager() 
{
    var _dataManager = require('../helpers/dataManager');
    var _cron = require('cron');

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

module.exports = scheduleManager();