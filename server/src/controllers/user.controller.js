const database = require('../database');
const jwt = require('jsonwebtoken');
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
      .where('id', req.params.userId)
      .first();
    res.json({ user });
  } catch (error) {
    console.error(error);
    res.status(httpCodes.NOT_FOUND).json({ message: "User doesn't exist!" });
  }
};
