var dataManager = require('../helpers/dataManager');
var cron = require('cron');

function managerDefinitions() 
{
    function startOutgoingEmailSchedule()
    {
        var job = new cron.CronJob({
            cronTime: '* * * * *',
            onTick: function() {
                console.log('job 1 ticked');
            },
            start: false
        });
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