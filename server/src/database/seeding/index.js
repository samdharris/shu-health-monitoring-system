const userSeeder = require('./userSeeder');

exports.run = async (n = 1) => {
  await userSeeder.seedDoctor(n);
  await userSeeder.seedPatient(n);
  console.log('Seeding done!');
  process.exit(0);
};
