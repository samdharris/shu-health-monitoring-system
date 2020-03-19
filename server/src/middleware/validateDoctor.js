const httpCodes = require('http-status-codes');
const constants = require('../constants')

module.exports = async (req, res, next) => {
    try {
        // Checks if account type is a doctor
        if (req.user.account_type == constants.ACCOUNT_TYPES.ACCOUNT_DOCTOR) {
            next();
        } else {
            res.status(httpCodes.FORBIDDEN).send(); // Gives a 403 error if user is not a doctor
        }
    } catch (error) {
        res.status(httpCodes.UNAUTHORIZED).send(); // Gives a 401 error
    }
}