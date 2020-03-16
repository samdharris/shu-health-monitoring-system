const knex = require('knex');

/**
 * Opens up a connection to the database
 */
exports.start = () => {
  /**
   * We use sqlite on the unit tests since we don't have access to a mysql database on CI.
   */
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
        port: process.env.DB_PORT || 3306,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DATABASE
      }
    });
  }
  console.log('connected to server!');
};

/**
 * Access an instance of knex on a given table to begin a query
 */
exports.knex = tableName => this.knex(tableName).delete();

/**
 * Returns the current instance of knex
 */
exports.instance = this.knex;
