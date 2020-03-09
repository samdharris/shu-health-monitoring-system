const knex = require('knex');

exports.start = () => {
  if (process.env.NODE_ENV === 'test') {
    this.knex = knex({
      client: 'sqlite',
      connection: ':memory:',
      useNullAsDefault: true
    });
  } else {
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
  }
  console.log('connected to server!');
};

exports.knex = tableName => this.knex(tableName).delete();
exports.instance = this.knex;
