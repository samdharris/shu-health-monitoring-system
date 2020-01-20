const knex = require('knex');

exports.start = () => {
  this.knex = knex({
    client: 'mysql',
    connection: {
      host: process.env.DB_HOST,
      port: process.env.port || 3306,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DATABASE
    }
  });
};

exports.knex = tableName => this.knex(tableName);
