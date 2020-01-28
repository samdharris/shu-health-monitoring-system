const database = require('./database');
const app = require('./app');

const { PORT } = process.env;

database.start();

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
