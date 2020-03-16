const database = require('../database');
const _ = require('lodash');
const httpCodes = require('http-status-codes');

/**
 * GET - /api/users
 * Gets all users of the system
 *
 * @param {Object} req
 * @param {Object} res
 */
exports.index = async (req, res) => {
  const users = await database.knex('users').select('*');
  res.json({
    message: 'Users',
    users
  });
};

/**
 * GET - /api/users/:id
 * Gets a given user
 *
 * @param {Object} req
 * @param {Object} res
 */
exports.getUser = async (req, res) => {
  try {
    const user = await database
      .knex('users')
      .where('users.id', req.params.userId)
      .first();

    if (_.isNil(user)) {
      return res.status(httpCodes.NOT_FOUND).send();
    }

    const address = await database
      .knex('addresses')
      .where('id', user.address_id)
      .first();

    res.json({ user, address });
  } catch (error) {
    console.error(error);
    res.status(httpCodes.NOT_FOUND).json({ message: "User doesn't exist!" });
  }
};
