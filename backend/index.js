const webapp = require('./server/server');

// (5) define the port
const port = process.env.PORT || 8080;

// start the server and connect to the DB
webapp.listen(port, async () => {
  console.log(`Server running on port: ${port}`); // eslint-disable-line no-console
});
