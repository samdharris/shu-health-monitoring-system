const jwt = require('jsonwebtoken');
const database = require('../database');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

exports.authenticate = async validatedData => {
  try {
    const user = await database
      .knex('users')
      .where('email_address', validatedData.username)
      .first();

    if (_.isNil(user)) {
      throw new Error({
        message: 'User Not Found'
      });
    }

    // check passwords match
    const match = await bcrypt.compare(validatedData.password, user.password);

    if (!match) {
      throw new Error({
        message: "Passwords don't match"
      });
    }

    user.password = undefined;
    return Promise.resolve({
      accessToken: jwt.sign({ userId: user.id }, process.env.JWT_SECRET),
      user
    });
  } catch (err) {
    return Promise.reject(err);
  }
};
