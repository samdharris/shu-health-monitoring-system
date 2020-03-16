const database = require('../database');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const httpCodes = require('http-status-codes');

exports.index = async (req, res) => {
  const users = await database.knex('users').select('*');
  res.json({
    message: 'Users',
    users
  });
};

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
