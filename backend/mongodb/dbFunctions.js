// import the mongodb driver
const { MongoClient } = require('mongodb');

// import ObjectID
const { ObjectId } = require('mongodb');

// mongodb server URL
const dbURL = 'mongodb+srv://dbUser:Group21_@team21.8nk7d4t.mongodb.net/DOTS?retryWrites=true&w=majority';

// Connection
let MongoConnection;

const connect = async () => {
  // always use try/catch to handle any exception
  try {
    MongoConnection = (await MongoClient.connect(
      dbURL,
      { useNewUrlParser: true, useUnifiedTopology: true },
    )); // we return the entire connection, not just the DB
    // check that we are connected to the db
    console.log(`connected to db: ${MongoConnection.db().databaseName}`); // eslint-disable-line no-console
    return MongoConnection;
  } catch (err) {
    throw new Error(err.message);
  }
};

const getDB = async () => {
  if (!MongoConnection) {
    await connect();
  }
  return MongoConnection.db();
};

const closeMongoDBConnection = async () => {
  await MongoConnection.close();
};

// READ all students
// await/async syntax
const getAllUsers = async () => {
  try {
    const db = await getDB();
    const result = await db.collection('user').find({}).toArray();
    return result;
  } catch (err) {
    throw new Error(`error: ${err.message}`);
  }
};

// const getUsersByIDs = async (userIDs) => {
//     try {
//         const ObjUserIDs = userIDs.map(id => ObjectId(id));
//         const db = await getDB();
//         const result = await db.collection('user').find(
//             {
//                 _id:
//                     { $in: ObjUserIDs }
//             }).toArray();
//         // throw new Error(`${JSON.stringify(result)}`);
//         return result;
//     }
//     catch (err) {
//         console.error(err);
//     }
// }

// READ a student given their ID
const getUserByID = async (userID) => {
  try {
    // get the db
    const db = await getDB();
    const result = await db.collection('user').findOne({ _id: ObjectId(userID) });
    return result;
  } catch (err) {
    throw new Error(`error: ${err.message}`);
  }
};

// get user by email
const getUserByEmail = async (userEmail) => {
  try {
    const db = await getDB();
    const result = await db.collection('user').findOne({ email: userEmail });
    return result;
  } catch (err) {
    throw new Error(`error: ${err.message}`);
  }
};

const updateUser = async (userID, payload) => {
  try {
    const db = await getDB();
    const result = await db.collection('user').updateOne(
      { _id: ObjectId(userID) },
      { $set: payload },

    );
    return result;
  } catch (err) {
    throw new Error(`error: ${err.message}`);
  }
};

const createUser = async (userObject) => {
  try {
    const db = await getDB();
    const result = await db.collection('user').insertOne(
      userObject,
    );
    // result contains
    // - A boolean `acknowledged`
    // - A field `insertedId` with the _id value
    return result;
  } catch (err) {
    throw new Error(`error: ${err.message}`);
  }
};

const getFollowings = async (userID) => {
  try {
    const db = await getDB();
    // Bug: I used the proction to select only `followings` field
    // but it still returns all the fields.
    const result = await db.collection('user').findOne(
      { _id: ObjectId(userID) },
      {
        _id: 0,
        followings: 1,
      },
    );
    return result.followings;
  } catch (err) {
    throw new Error(`error: ${err.message}`);
  }
};

const getFollowers = async (userID) => {
  try {
    const db = await getDB();
    // Bug: I used the proction to select only `followers` field
    // but it still returns all the fields.
    const result = await db.collection('user').findOne(
      { _id: ObjectId(userID) },
      {
        _id: 0,
        followers: 1,
      },
    );
    return result.followers;
  } catch (err) {
    throw new Error(err);
  }
};

// TODO: getFeed
// It should be implemented in `server.js` or `dbFunctions.js`?

const getPostByID = async (postID) => {
  try {
    const db = await getDB();
    const result = await db.collection('post').findOne(
      { _id: ObjectId(postID) },
    );
    return result;
  } catch (err) {
    throw new Error(`error: ${err.message}`);
  }
};

const getPostsByUserID = async (userID) => {
  try {
    const db = await getDB();

    const result = await db.collection('post').find(
      { owner: userID },
    ).toArray();
    return result;
  } catch (err) {
    throw new Error(`error: ${err.message}`);
  }
};

const updatePost = async (postID, payload) => {
  try {
    // const payload = {};
    // payload[field] = value;
    const db = await getDB();
    const result = await db.collection('post').updateOne(
      { _id: ObjectId(postID) },
      { $set: payload },
    );
    return result;
  } catch (err) {
    throw new Error(`error: ${err.message}`);
  }
};

const createPost = async (postObject) => {
  try {
    const db = await getDB();
    const result = await db.collection('post').insertOne(
      postObject,
    );
    // result contains
    // - A boolean `acknowledged`
    // - A field `insertedId` with the _id value
    return result;
  } catch (err) {
    throw new Error(`error: ${err.message}`);
  }
};

const deletePost = async (postID) => {
  try {
    const db = await getDB();
    const result = await db.collection('post').deleteOne({ _id: ObjectId(postID) });
    return result;
  } catch (err) {
    throw new Error(`error: ${err.message}`);
  }
};

const deleteTestUser = async () => {
  try {
    const db = await getDB();
    const result = await db.collection('user').deleteOne({ email: 'testuser@example.com' });
    return result;
  } catch (err) {
    throw new Error('error', err.message);
  }
};

// TODO: getSuggestedFollowings
// It should be implemented in `server.js` or `dbFunctions.js`?

// For TEST:
// getUsersByIDs(['6377e0b34661a1bbf54d80b1', '6377e1b64661a1bbf54d80b2']);
// getUserByEmail("zhengyt1@gmail.com");
// getFollowings('6377e0b34661a1bbf54d80b1');
// getFollowers('6377e0b34661a1bbf54d80b1');
// updateUser('6377e0b34661a1bbf54d80b1', 'password', '22');
// const newUser = { "username": "gaga", "avatar": "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/340.jpg", "password": "22", "email": "zhengyt1@gmail.com", "description": "description 2", "followers": [{ "$oid": "6377e1b64661a1bbf54d80b2" }], "followings": [{ "$oid": "6377e1b64661a1bbf54d80b2" }], "posts": [] };
// createUser(newUser);

// export the functions
module.exports = {
  closeMongoDBConnection,
  getDB,
  connect,
  getAllUsers,
  getUserByID,
  // getUsersByIDs,
  getUserByEmail,
  updateUser,
  createUser,
  getFollowings,
  getFollowers,
  getPostByID,
  getPostsByUserID,
  updatePost,
  createPost,
  deletePost,
  deleteTestUser,
};
