# Server

## Installation

1. `yarn install`
2. Copy .env.example and rename it to .env
3. Replace the `REPLACE` bits in .env with the appropriate config for your system.

## Running Migrations

For migrations, we use knex.js. This will need to [globally install the knex migrations cli on your system](http://knexjs.org/#Migrations-CLI).

To run a migration up, run `knex migrate:latest`

To rollback a migration, run: `knex migrate:rollback`
