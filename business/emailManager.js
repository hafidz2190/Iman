function emailManager() 
{
    var _nodemailer = require('nodemailer');
    
    var _appConfig = requireLocal('config.json');
    var _dataManager = requireLocal('helpers/dataManager');

    var _transporterConfig = _appConfig.smtp.transporter;
    var _smtpUser = _appConfig.smtp.transporter.auth.user;
    
    function createOutgoingEmail(to, subject, body, transactionScope)
    {
        var outgoingEmailModel = {
            from: _smtpUser,
            to: to,
            subject: subject,
            body: body
        };

        return _dataManager.save('outgoingEmail', outgoingEmailModel, transactionScope);
    }

    function sendEmail(to, subject, body)
    {
        var transporter = _nodemailer.createTransport(_transporterConfig);
        var mailOptions = {
            from: _smtpUser,
            to: to,
            subject: subject,
            html: body
        }

        return new Promise((resolve, reject) =>
        {
            transporter.sendMail(mailOptions, (error, result) =>
            {
                transporter.close();

                if(error)
                    return reject(error);
                
                return resolve(result);
            });
        });
    }

    return {
        createOutgoingEmail: createOutgoingEmail,
        sendEmail: sendEmail
    };
}

module.exports = emailManager();