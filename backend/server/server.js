// backend ==> require
const express = require('express');
const cors = require('cors');

const webapp = express();
webapp.use(cors());
webapp.use(express.urlencoded({ extended: true }));
webapp.use(express.json());
const userDBLib = require('../mongodb/userDBFunctions');
const postDBLib = require('../mongodb/postDBFunctions');

// root endpoint / route
webapp.get('/', (req, resp) => {
  resp.json({ message: 'welcome to our backend!!!' });
});

// implement the GET /students endpoint
webapp.get('/users', async (req, res) => {
  try {
    // get the data from the db
    const results = await userDBLib.getAllUsers();
    // send the response with the appropriate status code
    res.status(200).json({ data: results });
  } catch (err) {
    res.status(404).json({ message: 'there was error' });
  }
});

webapp.post('/login', async (req, res) => {
  try {
    const results = await userDBLib.getUserByEmail(req.body.email);
    if (results.password === req.body.password) {
      res.status(200).json({ data: results });
    } else {
      res.status(401).json({ message: 'email and password do not match' });
    }
  } catch (err) {
    res.status(404).json({ message: 'there is an error' });
  }
});

webapp.get('/user/:id', async (req, res) => {
  try {
    const results = await userDBLib.getUserByID(req.params.id);
    res.status(200).json({ data: results });
  } catch (err) {
    res.status(404).json({ message: 'there is an error' });
  }
});

webapp.put('/user/:id', async (req, res) => {
  try {
    const results = await userDBLib.updateUser(req.params.id, req.body);
    res.status(200).json({ data: results });
  } catch (err) {
    res.status(404).json({ message: 'there is an error' });
  }
});

webapp.post('/user', async (req, res) => {
  try {
    const user = await userDBLib.getUserByEmail(req.body.email);
    if (user) {
      res.status(409).json({ message: 'the user already exists in the database' });
      return;
    }
    const results = await userDBLib.createUser(req.body);
    res.status(200).json({ data: results });
  } catch (err) {
    res.status(404).json({ message: 'there is an error' });
  }
});

webapp.get('/followings/:id', async (req, res) => {
  try {
    const results = await userDBLib.getFollowings(req.params.id);
    res.status(200).json({ data: results });
  } catch (err) {
    res.status(404).json({ message: 'there is an error' });
  }
});

webapp.get('/followers/:id', async (req, res) => {
  try {
    const results = await userDBLib.getFollowers(req.params.id);
    res.status(200).json({ data: results });
  } catch (err) {
    res.status(404).json({ message: 'there is an error' });
  }
});

webapp.get('/post/:id', async (req, res) => {
  try {
    const results = await postDBLib.getPostByID(req.params.id);
    res.status(200).json({ data: results });
  } catch (err) {
    res.status(404).json({ message: 'there is an error' });
  }
});

webapp.get('/post', async (req, res) => {
  if (!req.query) {
    res.status(404).json({ message: 'get post without queryByText}' });
    return;
  }
  try {
    const results = await postDBLib.getPostsByUserID(req.query.owner);
    res.status(200).json({ data: results });
  } catch (err) {
    res.status(404).json({ message: 'there is an error' });
  }
});

webapp.put('/post/:id', async (req, res) => {
  try {
    const results = await postDBLib.updatePost(req.params.id, req.body);
    res.status(200).json({ data: results });
  } catch (err) {
    res.status(404).json({ message: 'there is an error' });
  }
});

webapp.post('/post', async (req, res) => {
  if (!req.body) {
    res.status(404).json({ message: 'missing post body' });
    return;
  }
  try {
    const results = await postDBLib.createPost(req.body);
    res.status(200).json({ data: results });
  } catch (err) {
    res.status(404).json({ message: 'there is an error' });
  }
});

webapp.delete('/post/:id', async (req, res) => {
  try {
    const results = await postDBLib.deletePost(req.params.id);
    res.status(200).json({ data: results });
  } catch (err) {
    res.status(404).json({ message: 'there is an error' });
  }
});

module.exports = webapp;
