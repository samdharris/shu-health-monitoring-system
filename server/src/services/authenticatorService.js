const jwt = require('jsonwebtoken');
const database = require('../database');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

/**
 * Authenciates the user. Generating a jwt token
 *
 * @param {Object} validatedData
 * @returns {Promise<Object>} access token and the authenticated user record
 */
exports.authenticate = async validatedData => {
  try {
    const user = await database
      .knex('users')
      .where('email_address', validatedData.email)
      .first();

    if (_.isNil(user)) {
      throw new Error('User not found');
    }

    // check passwords match
    const match = await bcrypt.compare(validatedData.password, user.password);

    if (!match) {
      throw new Error("Passwords don't match.");
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

/**
 * Authenciates the user with the given token
 *
 * @param {String} header
 * @returns {Promise<Object>} the authenticated user record
 */
exports.authenticateWithToken = async header => {
  try {
    if (_.isNil(header)) {
      throw new Error('Missing Authorization header!');
    }

    const token = header.split(' ')[1].trim();
    const { userId } = jwt.verify(token, process.env.JWT_SECRET);
    const user = await database
      .knex('users')
      .where('id', userId)
      .first();
    return Promise.resolve({
      user
    });
  } catch (err) {
    return Promise.reject(err);
  }
};
