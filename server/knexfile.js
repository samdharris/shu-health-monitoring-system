// Update with your config settings.
require('dotenv').config();
module.exports = {
  development: {
    client: 'mysql',
    connection: {
      host: process.env.DB_HOST,
      port: process.env.port || 3306,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DATABASE
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './src/database/migrations'
    }
  },
  test: {
    client: 'sqlite',
    connection: {
      filename: './database.sqlite'
    },
    pool: {
      min: 1,
      max: 1,
      idleTimeoutMillis: 360000 * 1000
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './src/database/migrations'
    },
    useNullAsDefault: true
  },
  production: {
    client: 'mysql',
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DATABASE
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './src/database/migrations'
    }
  }
};
