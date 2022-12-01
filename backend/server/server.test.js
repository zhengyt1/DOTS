const request = require('supertest');

// Import database operations
const dbLib = require('../mongodb/dbFunctions');

const webapp = require('./server');

/**
 * If you get an error with afterEach
 * inside .eslintrc.json in the
 * "env" key add -"jest": true-
 */

let testStudentID;
let postID;

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
    const res = await request(webapp).post('/user').send(user);
    const postRes = await request(webapp).post('/post').send(post);
    // get the id of the test student
    testStudentID = JSON.parse(res.text).data.insertedId;
    postID = JSON.parse(postRes.text).data.insertedId;
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
    await dbLib.deleteTestUser();
    await dbLib.deletePost(postID);
    await dbLib.closeMongoDBConnection(); // mongo client that started server.
  } catch (err) {
    console.log(err);
  }
});

describe('Create player endpoint API & integration tests', () => {
  test('status code and response when posting existent user', async () => {
    const res = await request(webapp).post('/user').send('email=testuser@example.com');
    expect(res.statusCode).toBe(409);
    expect(JSON.parse(res.text).message).toBe('the user already exists in the database');
  });

  test('test user related function', async () => {
    const res = await request(webapp).put(`/user/${testStudentID}`).send('password=111');
    expect(res.statusCode).toBe(200);
    const user = await request(webapp).get(`/user/${testStudentID}`);
    expect(JSON.parse(user.text).data.password).toBe('111');
    const followings = await request(webapp).get(`/followings/${testStudentID}`);
    expect(JSON.parse(followings.text).data).toStrictEqual([]);
    const followers = await request(webapp).get(`/followers/${testStudentID}`);
    expect(JSON.parse(followers.text).data).toStrictEqual([]);
  });

  test('test post related function', async () => {
    const res = await request(webapp).put(`/post/${postID}`).send('text=miaomiaomiao');
    expect(res.statusCode).toBe(200);
    const post = await request(webapp).get(`/post/${postID}`);
    expect(JSON.parse(post.text).data.text).toBe('miaomiaomiao');
  });
});
