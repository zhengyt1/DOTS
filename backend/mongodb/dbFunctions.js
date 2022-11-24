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
        console.log(`connected to db: ${MongoConnection.db().databaseName}`);
        return MongoConnection;
    } catch (err) {
        console.log(err.message);
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
        // get the db
        const db = await getDB();
        const result = await db.collection('user').find({}).toArray();
        // print the results
        console.log(`Students: ${JSON.stringify(result)}`);
        return result;
    } catch (err) {
        console.log(`error: ${err.message}`);
    }
};
  
// READ a student given their ID
const getUserByID = async (userID) => {
    try {
        // get the db
        const db = await getDB();
        const result = await db.collection('user').findOne({ _id: ObjectId(userID) });
        // print the result
        console.log(`User: ${JSON.stringify(result)}`);
        return result;
    } catch (err) {
        console.log(`error: ${err.message}`);
    }
};

// export the functions
module.exports = {
    closeMongoDBConnection,
    getDB,
    connect,
    getUserByID,
    getAllUsers,
};