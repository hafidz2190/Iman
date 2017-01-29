var appConfig = require('../config.json');
var dataManager = require('../helpers/dataManager');
var nodemailer = require('nodemailer');

function managerDefinitions() 
{
    function sendEmail(to, subject, body)
    {
        var transporter = nodemailer.createTransport('SMTP', appConfig.smtp);
        var mailOptions = {
            from: appConfig.smtp.auth.XOAuth2.user,
            to: to,
            subject: subject,
            html: body,
            generateTextFromHTML: true
        }

        transporter.sendMail(mailOptions, callback);

        function callback(error, response)
        {
            return new Promise((resolve, reject) =>
            {
                if(error)
                    return reject(error);

                return resolve(response);
            })
            
        }
    }

    function createOutgoingEmail(to, subject, body, transactionScope)
    {
        var outgoingEmailModel = {
            from: appConfig.smtp.auth.XOAuth2.user,
            to: to,
            subject: subject,
            body: body
        };

        return dataManager.save('outgoingEmail', outgoingEmailModel, transactionScope);
    }

    function createOutgoingEmailFromTemplate(to, type, transactionScope)
    {
        return dataManager.save('outgoingEmail', getOutgoingEmailTemplate(to, type), transactionScope);
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
            from: appConfig.smtp.auth.XOAuth2.user,
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

module.exports = managerDefinitions();