const httpCodes = require('http-status-codes');
const constants = require('../constants')

module.exports = async (req, res, next) => {
    try {
        if (req.user.account_type == constants.ACCOUNT_TYPES.ACCOUNT_DOCTOR) {
            next();
        } else {
            res.status(httpCodes.FORBIDDEN).send();
        }
    } catch (error) {
        res.status(httpCodes.UNAUTHORIZED).send();
    }
}