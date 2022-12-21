// backend ==> require
const express = require('express');
const cors = require('cors');

// import json web token
const jwt = require('jsonwebtoken');

const dotenv = require('dotenv');

const path = require('path');
const favicon = require('serve-favicon');
// get config vars
dotenv.config();

// access config var

// secret key
// eslint-disable-next-line max-len
// 0e1b98cd289418f10cd78a55c5b9192f0b17d4b71c094a6443018c70d95432e9ec2534d290606e374a92d609a4491005c571b42673b0c7b12e1fec243c5fb265
const secret = process.env.TOKEN_SECRET;
const EXPIRE_TIME = '120s';
const webapp = express();
webapp.use(cors());
webapp.use(express.urlencoded({ extended: true }));
webapp.use(express.json());
webapp.use(express.static(path.join(__dirname, '../../dots/build')));
webapp.use(favicon(path.join(__dirname, '../../dots/build', 'favicon.ico')));
const userDBLib = require('../mongodb/userDBFunctions');
const postDBLib = require('../mongodb/postDBFunctions');

const authenticateUser = async (token, key) => {
  // check the params
  // console.log(`authenticate, ${token}`);
  if (!token || !key) {
    // console.log('ret');
    return null;
  }
  try {
    // console.log('try');
    const decoded = jwt.verify(token, key);
    // console.log('decoded: ', decoded);
    return decoded._id;
  } catch (err) {
    return null;
  }
};

// implement the GET /students endpoint
webapp.get('/users', async (req, res) => {
  if (await authenticateUser(req.headers.authorization, secret)) {
    try {
      // get the data from the db
      const results = await userDBLib.getAllUsers();
      // send the response with the appropriate status code
      res.status(200).json({ data: results });
    } catch (err) {
      res.status(404).json({ message: 'there was error' });
    }
  } else {
    res.status(401).json({ message: 'failed authentication' });
  }
});

webapp.post('/login', async (req, res) => {
  const payload = {};
  const frozenMinutes = 1;
  try {
    const results = await userDBLib.getUserByEmail(req.body.email);
    if (!results) {
      res.status(401).json({ message: 'the user is not in the database' });
      return;
    }
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
        const jwtoken = jwt.sign({ _id: results._id }, secret, { expiresIn: EXPIRE_TIME });
        res.status(201).json({ token: jwtoken });
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
        res.status(401).json({ message: 'email and password do not match' });
      }
    }
  } catch (err) {
    res.status(404).json({ message: 'there is an error' });
  }
});

webapp.get('/user/:id', async (req, res) => {
  let user = await authenticateUser(req.headers.authorization, secret);
  if (user) {
    try {
      if (req.params.id !== 'selfId' && req.params.id !== req.headers.authorization) {
        user = req.params.id;
      }
      const results = await userDBLib.getUserByID(user);
      if (!results) {
        res.status(404).json({ message: 'no such user' });
        return;
      }
      res.status(200).json({ data: results });
    } catch (err) {
      res.status(404).json({ message: 'there is an error' });
    }
  } else {
    res.status(401).json({ message: 'failed authentication/expired, please re-login' });
  }
});

webapp.put('/user/:id', async (req, res) => {
  let user = await authenticateUser(req.headers.authorization, secret);
  if (user) {
    try {
      if (req.params.id !== 'selfId') {
        user = req.params.id;
      }
      const results = await userDBLib.updateUser(req.params.id, req.body);
      if (!results) {
        res.status(404).json({ message: 'no such user' });
        return;
      }
      res.status(200).json({ data: results });
    } catch (err) {
      res.status(404).json({ message: 'there is an error' });
    }
  } else {
    res.status(401).json({ message: 'failed authentication' });
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
    const jwtoken = jwt.sign({ _id: results.insertedId }, secret, { expiresIn: EXPIRE_TIME });
    res.status(201).json({ token: jwtoken, data: results });
  } catch (err) {
    res.status(404).json({ message: 'there is an error' });
  }
});

webapp.get('/followings/:id', async (req, res) => {
  const userId = await authenticateUser(req.headers.authorization, secret);
  if (userId) {
    try {
      const results = await userDBLib.getFollowings(userId);
      res.status(200).json({ data: results });
    } catch (err) {
      res.status(404).json({ message: 'there is an error' });
    }
  } else {
    res.status(401).json({ message: 'failed authentication' });
  }
});

webapp.delete('/test/user', async (req, res) => {
  try {
    const results = await userDBLib.deleteTestUser();
    if (!results) {
      res.status(404).json({ message: 'no such user' });
      return;
    }
    res.status(200).json({ data: results });
  } catch (err) {
    res.status(404).json({ message: 'there is an error' });
  }
});

webapp.get('/followers/:id', async (req, res) => {
  const userId = await authenticateUser(req.headers.authorization, secret);
  if (userId) {
    try {
      const results = await userDBLib.getFollowers(userId);
      res.status(200).json({ data: results });
    } catch (err) {
      res.status(404).json({ message: 'there is an error' });
    }
  } else {
    res.status(401).json({ message: 'failed authentication' });
  }
});

webapp.get('/api/post/:id', async (req, res) => {
  if (await authenticateUser(req.headers.authorization, secret)) {
    try {
      const results = await postDBLib.getPostByID(req.params.id);
      res.status(200).json({ data: results });
    } catch (err) {
      res.status(404).json({ message: 'there is an error' });
    }
  } else {
    res.status(401).json({ message: 'failed authentication' });
  }
});

webapp.get('/api/post', async (req, res) => {
  if (await authenticateUser(req.headers.authorization, secret)) {
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
  } else {
    res.status(401).json({ message: 'failed authentication' });
  }
});

webapp.put('/api/post/:id', async (req, res) => {
  if (await authenticateUser(req.headers.authorization, secret)) {
    try {
      const results = await postDBLib.updatePost(req.params.id, req.body);
      res.status(200).json({ data: results });
    } catch (err) {
      res.status(404).json({ message: 'there is an error' });
    }
  } else {
    res.status(401).json({ message: 'failed authentication' });
  }
});

webapp.post('/api/post', async (req, res) => {
  if (await authenticateUser(req.headers.authorization, secret)) {
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
  } else {
    res.status(401).json({ message: 'failed authentication' });
  }
});

webapp.delete('/api/post/:id', async (req, res) => {
  if (await authenticateUser(req.headers.authorization, secret)) {
    try {
      const results = await postDBLib.deletePost(req.params.id);
      res.status(200).json({ data: results });
    } catch (err) {
      res.status(404).json({ message: 'there is an error' });
    }
  } else {
    res.status(401).json({ message: 'failed authentication' });
  }
});

// root endpoint / route
webapp.get('*', (req, resp) => {
  // resp.json({ message: 'welcome to our backend!!!' });
  resp.sendFile(path.join(__dirname, '../../dots/build/index.html'));
});

module.exports = webapp;
