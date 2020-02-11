require('dotenv').config();
const argsv = require('yargs')
  .usage('Seeds the database.')
  .option('number-to-generate', {
    default: 1,
    alias: 'n',
    type: 'number',
    describe: 'Number of entities to seed the database with.'
  }).argv;
const seeder = require('../src/database/seeding');

seeder.run(argsv.n || 1);
