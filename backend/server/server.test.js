const request = require('supertest');

// Import database operations
const userDBLib = require('../mongodb/userDBFunctions');
const postDBLib = require('../mongodb/postDBFunctions');
const webapp = require('./server');

/**
 * If you get an error with afterEach
 * inside .eslintrc.json in the
 * "env" key add -"jest": true-
 */

let testStudentID;
let postID;
let res;
const post = {
  text: '',
  pic: '',
  video: '',
  owner: testStudentID,
  comments: [],
  likes: [],
  isPrivate: true,
  createdTime: new Date(Date.now()).toISOString(),
};
beforeAll(async () => {
  try {
    const user = {
      username: 'testuser',
      avatar: '',
      password: '123',
      email: 'testuser@example.com',
      description: '',
      followers: [],
      followings: [],
    };

    res = await request(webapp).post('/user').send(user);
    testStudentID = res._body.data.insertedId;
  } catch (err) {
    throw new Error(err);
  }
});

/**
* Delete all test data from the DB
* Close all open connections
*/

afterAll(async () => {
  try {
    await userDBLib.deleteTestUser();
    await postDBLib.deletePost(postID);
    await postDBLib.closeMongoDBConnection();
    await userDBLib.closeMongoDBConnection(); // mongo client that started server.
  } catch (err) {
    throw new Error(err);
  }
});

let token;

describe('Create player endpoint API & integration tests', () => {
  test('status code and response when posting existent user', async () => {
    res = await request(webapp).post('/user').send('email=testuser@example.com');
    expect(res.statusCode).toBe(409);
    expect(JSON.parse(res.text).message).toBe('the user already exists in the database');
  });

  test('test login', async () => {
    res = await request(webapp).post('/login').send('email=testuser@example.com&password=123');
    token = JSON.parse(res.text).token;
    testStudentID = token;
    expect(res.statusCode).toBe(201);
  });

  test('test user related function', async () => {
    res = await request(webapp).get('/users').set('Authorization', token);
    expect(res.statusCode).toBe(200);
    res = await request(webapp).get('/users');
    expect(res.statusCode).toBe(401);
    res = await request(webapp).get(`/user/${testStudentID}`).set('Authorization', token);
    expect(res.statusCode).toBe(200);
    res = await request(webapp).get(`/user/${testStudentID}`);
    expect(res.statusCode).toBe(401);
    res = await request(webapp).put(`/user/${testStudentID}`).send('password=111').set('Authorization', token);
    expect(res.statusCode).toBe(404); // why it is 404?
    res = await request(webapp).put(`/user/${testStudentID}`).send('password=111');
    expect(res.statusCode).toBe(401);
    let followings = await request(webapp).get(`/followings/${testStudentID}`).set('Authorization', token);
    expect(followings.statusCode).toBe(200);
    followings = await request(webapp).get(`/followings/${testStudentID}`);
    expect(followings.statusCode).toBe(401);
    let followers = await request(webapp).get(`/followers/${testStudentID}`).set('Authorization', token);
    expect(followers.statusCode).toBe(200);
    followers = await request(webapp).get(`/followers/${testStudentID}`);
    expect(followers.statusCode).toBe(401);
  });

  test('test post related function', async () => {
    res = await request(webapp).post('/post').send(post);
    res = await request(webapp).post('/post').send(post).set('Authorization', token);
    postID = res._body.data.insertedId;
    res = await request(webapp).get(`/post/${postID}`).set('Authorization', token);
    expect(res.statusCode).toBe(200);
    res = await request(webapp).get(`/post/${postID}`);
    expect(res.statusCode).toBe(401);
    res = await request(webapp).put(`/post/${postID}`).send('text=miaomiaomiao').set('Authorization', token);
    expect(res.statusCode).toBe(200);
    res = await request(webapp).put(`/post/${postID}`).send('text=miaomiaomiao');
    expect(res.statusCode).toBe(401);
    res = await request(webapp).delete(`/post/${postID}`).set('Authorization', token);
    expect(res.statusCode).toBe(200);
    res = await request(webapp).delete(`/post/${postID}`);
    expect(res.statusCode).toBe(401);
  });
});
