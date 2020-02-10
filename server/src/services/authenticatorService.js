const jwt = require('jsonwebtoken');
const database = require('../database');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

exports.authenticate = async validatedData => {
  const user = database
    .knex('users')
    .where('username', '=', validatedData.username);

  if (_.isNil(user)) {
    throw new Error('User Not Found');
  }

  // check passwords match
  const match = await bcrypt.compare(validatedData.password, user.password);

  if (!match) {
    throw new Error("Passwords don't match");
  }

  user.password = undefined;
  return {
    accessToken: jwt.sign(user.id),
    user
  };
};
