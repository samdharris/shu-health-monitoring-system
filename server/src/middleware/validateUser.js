const authenticatorService = require('../services/authenticatorService');
const httpCodes = require('http-status-codes');

module.exports = async (req, res, next) => {
    try {
        const {
            user
        } = await authenticatorService.authenticateWithToken(req.header('Authorization'))
        req.user = user;
        next();
    } catch (error) {
        res.status(httpCodes.UNAUTHORIZED).send();
    }
}