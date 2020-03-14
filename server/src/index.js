const database = require("./database");
const app = require("./app");

const { SERV_PORT } = process.env;

database.start();

// Start the server
app.listen(SERV_PORT, () => {
  console.log(`Server running on port ${SERV_PORT}`);
});
