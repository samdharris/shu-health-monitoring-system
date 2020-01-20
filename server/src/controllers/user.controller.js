const database = require('../database');

exports.index = async (req, res) => {
  const users = await database.knex('users').select('*');
  res.json({
    message: 'Users',
    users
  });
};
