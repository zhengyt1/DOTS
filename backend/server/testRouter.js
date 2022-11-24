// backend ==> require
const express = require('express');
const cors = require('cors');


const webapp = express();
webapp.use(cors());
webapp.use(express.urlencoded({ extended: true }));
const dbLib = require('../mongodb/dbFunctions');


// root endpoint / route
webapp.get('/', (req, resp) => {
  resp.json({ message: 'welcome to our backend!!!' });
});

// implement the GET /students endpoint
webapp.get('/user', async (req, res) => {
  console.log('READ all users');
  try {
    // get the data from the db
    const results = await dbLib.getAllUsers();
    // send the response with the appropriate status code
    res.status(200).json({ data: results });
  } catch (err) {
    res.status(404).json({ message: 'there was error' });
  }
});

module.exports = webapp;