function emailManager() 
{
    var _appConfig = require('../config.json');
    var _dataManager = require('../helpers/dataManager');
    var _nodemailer = require('nodemailer');

    var _transporterConfig = _appConfig.smtp.transporter;
    var _smtpUser = _appConfig.smtp.transporter.auth.user;

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

    function createOutgoingEmailFromTemplate(to, type, transactionScope)
    {
        return _dataManager.save('outgoingEmail', getOutgoingEmailTemplate(to, type), transactionScope);
    }

    function getOutgoingEmailTemplateTypeMap()
    {
        var outgoingEmailTemplateTypeMap = {};
        outgoingEmailTemplateTypeMap.userManager = {};
        outgoingEmailTemplateTypeMap.userManager.createUser = 1;

        return outgoingEmailTemplateTypeMap;
    }

    function getOutgoingEmailTemplate(to, type)
    {
        var outgoingEmailModel = {
            from: _smtpUser,
            to: to,
            subject: 'No Subject',
            body: '<b>No Body</b>'
        };

        switch(type)
        {
            case 1:
                outgoingEmailModel.subject = 'Create User';
                outgoingEmailModel.body = '<b>Create User</b>';
                break;
            default:
                break;
        }

        return outgoingEmailModel;
    }

    return {
        sendEmail: sendEmail,
        createOutgoingEmail: createOutgoingEmail,
        createOutgoingEmailFromTemplate: createOutgoingEmailFromTemplate,
        getOutgoingEmailTemplateTypeMap: getOutgoingEmailTemplateTypeMap
    };
}

module.exports = emailManager();