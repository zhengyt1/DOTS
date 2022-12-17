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
  const payload = {};
  const frozenMinutes = 1;
  try {
    const results = await userDBLib.getUserByEmail(req.body.email);
    if (results._id) {
      if ('limitLoginTime' in results) { // If we record, then first check it
        if (results.limitLoginTime >= Date.now()) {
          const remainTime = parseInt((results.limitLoginTime - Date.now()) / (365 * 24 * 60), 10);
          if (remainTime <= 0) {
            res.status(404).json({ message: 'You are limited to login, please wait less than one minute to try agian' });
          } else {
            res.status(404).json({ message: `You are limited to login, please wait ${remainTime.toString()} minutes to try agian` });
          }
          return;
        }
        // limit login time should be cleared
        if (results.failedTimes >= 3) {
          payload.failedTimes = 0;
          results.failedTimes = 0;
          await userDBLib.updateUser(results._id, payload);
        }
      }
      if (results.password === req.body.password) {
        // Clear all failure times if this login succeed
        payload.failedTimes = 0;
        payload.limitLoginTime = Date.now();
        await userDBLib.updateUser(results._id, payload);
        res.status(200).json({ data: results });
      } else { // email and password do not match
        if (!('limitLoginTime' in results)) { // If we have no record before
          payload.failedTimes = 1;
          payload.limitLoginTime = Date.now();
        } else { // If we have record, add the record by one
          payload.failedTimes = results.failedTimes + 1;
          payload.limitLoginTime = Date.now();
        }
        if (payload.failedTimes >= 3) { // failure times have accumulated to 3
          payload.limitLoginTime = new Date(Date.now() + 60000 * frozenMinutes);
          await userDBLib.updateUser(results._id, payload);
          res.status(401).json({ message: `You are limited to login, please wait ${frozenMinutes} minute to try agian` });
          return;
        }
        await userDBLib.updateUser(results._id, payload);
      }

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
