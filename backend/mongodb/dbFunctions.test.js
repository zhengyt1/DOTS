const dbLib = require('./dbFunctions');

let testUserID;
let testPostID;

const testUser = {
  username: 'testuser',
  avatar: '',
  password: '123',
  email: 'testuser@example.com',
  description: '',
  followers: [],
  followings: [],
};
const testPost = {
  text: '',
  pic: '',
  video: '',
  owner: testUserID,
  comments: [],
  likes: [],
  isPrivate: true,
  createdTime: new Date(Date.now()).toISOString(),
};

// cleanup the database after each test
const clearDatabase = async () => {
  try {
    const result = await dbLib.deleteTestUser();
    await dbLib.deletePost(testPostID);
    const { deletedCount } = result;
    if (deletedCount === 1) {
      console.log('info', 'Successfully deleted player'); // eslint-disable-line no-console
    } else {
      throw new Error('warning', 'player was not deleted');
    }
  } catch (err) {
    throw new Error('error', err);
  }
};

afterAll(async () => {
  await clearDatabase();
  dbLib.closeMongoDBConnection();
});

describe('Database operations tests', () => {
  test('get all users', async () => {
    const res = await dbLib.getAllUsers();
    expect(res.length > 0);
  });

  test('create a test user', async () => {
    await dbLib.createUser(testUser);
    const insertedUser = await dbLib.getUserByEmail('testuser@example.com');
    expect(insertedUser.email).toEqual('testuser@example.com');
    testUserID = insertedUser._id;
  });

  test('update test user', async () => {
    const testUpdateUser = {
      username: 'testuser',
      avatar: '',
      password: '3333',
      email: 'testuser@example.com',
      description: '',
      followers: [],
      followings: [],
    };
    await dbLib.updateUser(testUserID, testUpdateUser);
    const updatedUser = await dbLib.getUserByEmail('testuser@example.com');
    expect(updatedUser.password).toEqual('3333');
  });

  test('create a test post', async () => {
    const postRes = await dbLib.createPost(testPost);
    testPostID = postRes.insertedId;
    const insertedPost = await await dbLib.getPostByID(testPostID);
    expect(insertedPost.text).toEqual('');
  });

  test('get posts by userID', async () => {
    const res = await dbLib.getPostsByUserID(testUserID);
    expect(res.length === 0);
  });

  test('update post', async () => {
    const testUpdatePost = {
      text: 'hi',
      pic: '',
      video: '',
      owner: testUserID,
      comments: [],
      likes: [],
      isPrivate: true,
      createdTime: new Date(Date.now()).toISOString(),
    };
    await dbLib.updatePost(testPostID, testUpdatePost);
    const updatedPost = await dbLib.getPostByID(testPostID);
    expect(updatedPost.text).toEqual('hi');
  });
});
