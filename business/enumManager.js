function enumManager() 
{
    var _emailSubjectMap = {};
    var _errorMessageMap = {};
    var _templatePathMap = {};

    _emailSubjectMap.user = {};
    _emailSubjectMap.user.resetPassword = '[MMM Iman] Reset Your Password';
    _emailSubjectMap.user.verification = '[MMM Iman] Verify Your Account';

    _errorMessageMap.entity = {};
    _errorMessageMap.entity.illegalEntity = 'Illegal entity {{{0}}}';
    _errorMessageMap.entity.illegalProperty = 'Illegal property {{{0}}} in entity {{{1}}}';
    _errorMessageMap.entity.notAuthorized = 'You are not authorized to modify this record';
    _errorMessageMap.entity.propertyIsRequired = 'Property {{{0}}} is required';
    _errorMessageMap.entity.recordNotExist = 'The record that you are trying to store is not exist';
    _errorMessageMap.entity.versionInvalid = 'The record that you are trying to store has been modified';
    _errorMessageMap.user = {};
    _errorMessageMap.user.emailExist = 'Email already exist';
    _errorMessageMap.user.emailNotExist = 'Email not exist';
    _errorMessageMap.user.userNotExist = 'User not exist';
    _errorMessageMap.user.wrongPassword = 'Wrong password';
    _errorMessageMap.user.wrongActivationId = 'Wrong activation id';
    _errorMessageMap.user.wrongResetPasswordId = 'Wrong reset password id';
    _errorMessageMap.userSession = {};
    _errorMessageMap.userSession.sessionInvalid = 'User session invalid';

    _templatePathMap.user = {};
    _templatePathMap.user.resetPassword = 'userResetPassword.html';
    _templatePathMap.user.verification = 'userVerification.html';


    return {
        emailSubjectMap: _emailSubjectMap,
        errorMessageMap: _errorMessageMap,
        templatePathMap: _templatePathMap
    }
}

module.exports = enumManager();