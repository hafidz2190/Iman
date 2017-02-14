function scheduleManager() 
{
    var _cron = require('node-cron');

    var _appConfig = requireLocal('config.json');
    var _dataManager = requireLocal('helpers/dataManager');
    var _emailManager = requireLocal('business/emailManager');

    var _scheduleInterval = _appConfig.scheduleInterval;
    var _jobs = {
        'sendEmail': _cron.schedule(_scheduleInterval, sendEmail, false)
    };

    function start(scheduleName)
    {
        _jobs[scheduleName].start();
    }

    function stop(scheduleName)
    {
        _jobs[scheduleName].stop();
    }

    function sendEmail()
    {
        return _dataManager.processTransaction(transaction);

        function transaction(transactionScope)
        {
            var promise1 = _dataManager.fetchWithoutRelated('outgoingEmailCollection', {where: {status: 'Unsent'}}, [{field: 'date', direction: 'asc'}], 1, 1, transactionScope);

            // get oldest outgoing email
            promise1
            .then(function(outgoingEmailCollection)
            {
                var outgoingEmails = outgoingEmailCollection.toJSON();

                if(outgoingEmails.length <= 0)
                {
                    return new Promise((resolve, reject) =>
                    {
                        console.log('all email already sent');
                        return resolve(false);
                    })
                    .then(transactionScope.commit)
                    .catch(transactionScope.rollback);
                }

                var toUpdateOutgoingEmailModel = outgoingEmails[0];
                toUpdateOutgoingEmailModel.status = 'Sent';

                var to = toUpdateOutgoingEmailModel.to;
                var subject = toUpdateOutgoingEmailModel.subject;
                var body = toUpdateOutgoingEmailModel.body;

                var promise2 = _emailManager.sendEmail(to, subject, body);

                // send email
                promise2
                .then(function(sendEmailResult)
                {
                    var promise3 = _dataManager.save('outgoingEmail', toUpdateOutgoingEmailModel, transactionScope);

                    // update outgoing email status to sent
                    promise3
                    .then(function(updatedOutgoingEmailModel)
                    {
                        return new Promise((resolve, reject) =>
                        {
                            console.log('email sent ' + updatedOutgoingEmailModel.get('date'));
                            return resolve(true);
                        })
                        .then(transactionScope.commit)
                        .catch(transactionScope.rollback);
                    })
                    .catch(transactionScope.rollback);
                })
                .catch(transactionScope.rollback);
            })
            .catch(transactionScope.rollback);
        }
    }

    return {
        start: start,
        stop: stop
    };
}

module.exports = scheduleManager();