import axios from 'axios';
import { faker } from '@faker-js/faker';
/*
**** Example Usage
async function fetchData() {
    const roster = await getUsers();
    const user = await getUsersByUsername("jjohn");
    const updatePostResponse = await updatePost("1", "text", "today is a good day!");
    const deleteUserResponse = await deleteUser("1");
    console.log(roster);
    console.log(user[0].text);
    console.log(updatePostResponse);
    console.log(deleteUserResponse);
}
useEffect(() => {
    fetchData();
});
*/
// mockAPI URL
// const rootURL = 'https://63446bd6dcae733e8fdeff41.mockapi.io/api';
const rootURL = 'http://localhost:8080';

// get all users in the DB
export const getUsers = async () => {
  try {
    const response = await axios.get(`${rootURL}/users`);
    return response.data.data;
    // the data is stored in the mockData
    // field of the response
  } catch (err) {
    throw new Error(err);
  }
};

// get user by id
export const getUser = async (userID) => {
  try {
    const response = await axios.get(`${rootURL}/user/${userID}`);
    // console.log(userID, response);
    return response.data.data;
  } catch (err) {
    throw new Error(err);
  }
};

export const getUsersByIds = async (useIds) => {
  try {
    return Promise.all(
      useIds.map(async (id) => getUser(id)),
    );
  } catch (err) {
    throw new Error(err);
  }
};

// get user by email
export const getUserByEmail = async (email, password) => {
  try {
    const response = await axios.post(
      `${rootURL}/login`,
      { email, password },
    );
    return response.data.data;
  } catch (err) {
    throw new Error(err);
  }
};

// get user by username => return array of users
// export const getUsersByUsername = async (username) => {
//     try {
//         const response = await axios.get(`${rootURL}/user?username=${username}`);
//         return response.data.data;
//     }
//     catch (err) {
//         console.error(err);
//     }
// }

// update user field by value
export const updateUser = async (userID, field, value) => {
  const payload = {};
  payload[field] = value;
  try {
    const response = await axios.put(
      `${rootURL}/user/${userID}`,
      payload,
    );
    return response.data.data;
  } catch (err) {
    throw new Error(err);
  }
};

// create user
export const createUser = async (userObject) => {
  try {
    const user = {
      username: faker.internet.userName(),
      avatar: faker.image.avatar(),
      password: userObject.password,
      email: userObject.email,
      description: '',
      followers: [],
      followings: [],
    };
    const response = await axios.post(
      `${rootURL}/user`,
      user,
    );
    return response.data.data.insertedId;
  } catch (err) {
    throw new Error(err);
  }
};

// delete user
// export const deleteUser = async (userID) => {
//     try {
//         const response = await axios.delete(`${rootURL}/user/${userID}`);
//         return response.data.data;
//     }
//     catch (err) {
//         console.error(err);
//     }
// }

// get user's followings by userID
export const getFollowings = async (userID) => {
  try {
    const response = await axios.get(`${rootURL}/user/${userID}`);
    return response.data.data.followings;
    // the data is stored in the mockData
    // field of the response
  } catch (err) {
    throw new Error(err);
  }
};

// get all posts in the DB
// export const getPosts = async () => {
//     try {
//         const response = await axios.get(`${rootURL}/post`);
//         return response.data.data;
//         // the data is stored in the mockData
//         // field of the response
//     }
//     catch (err) {
//         console.error(err);

//     }
// }

// get post by id
export const getPostByID = async (postID) => {
  try {
    const response = await axios.get(`${rootURL}/post/${postID}`);
    return response.data.data;
  } catch (err) {
    throw new Error(err);
  }
};

// get post by user ID => return array of posts

export const getPostsByUserID = async (userID) => {
  try {
    const response = await axios.get(`${rootURL}/post?owner=${userID}`);
    return response.data.data;
  } catch (err) {
    throw new Error(err);
  }
};

export const getFeed = async (userID) => {
  try {
    const followings = await getFollowings(userID);
    const run = async () => Promise.all(
      followings.map(async (id) => getPostsByUserID(id)),
    );
    const posts = await run();

    return posts.flat();
  } catch (err) {
    throw new Error(err);
  }
};

// update post field by value
export const updatePost = async (postID, field, value) => {
  const payload = {};
  payload[field] = value;
  try {
    const response = await axios.put(
      `${rootURL}/post/${postID}`,
      payload,
    );
    return response.data.data;
  } catch (err) {
    throw new Error(err);
  }
};
// {
//     text: shareTextRef.current.value,
//     pic: "",
//     video: "",
//     owner: userID,
//     comments: [],
//     likes: [],
//     isPrivate: isPrivate,
//     createdTime: new Date(Date.now()).toISOString(),
//     mentions: tagUsersRef.current !== undefined && tagUsersRef.current !== null
//                                       ? tagUsersRef.current.value.split(", ") : []
//   };
// create user
export const createPost = async (postObject) => {
  try {
    const response = await axios.post(`${rootURL}/post`, postObject);
    return response.data.data;
  } catch (err) {
    throw new Error(err);
  }
};

// delete post
export const deletePost = async (postID) => {
  try {
    const response = await axios.delete(`${rootURL}/post/${postID}`);
    return response.data.data;
  } catch (err) {
    throw new Error(err);
  }
};

// get comment by id
// export const getCommentByID = async (commentID) => {
//     try {
//         const response = await axios.get(`${rootURL}/comment/${commentID}`);
//         return response.data.data;
//     }
//     catch (err) {
//         console.error(err);
//     }
// }

// get comments by post ID
// export const getCommentsByPostID = async (postID) => {
//     try {
//         const response = await axios.get(`${rootURL}/comment?post=${postID}`);
//         return response.data.data;
//     }
//     catch (err) {
//         console.error(err);
//     }
// }

// update comment field by value
// export const updateComment = async (commentID, field, value) => {
//     try {
//         const response = await axios.put(
//             `${rootURL}/comment/${commentID}`,
//             `${field}=${value}`
//         );
//         return response.data.data;
//     }
//     catch (err) {
//         console.error(err);
//     }
// }

// create comment
// export const createComment = async (commentObject) => {
//     try {
//         const response = await axios.post(
//             `${rootURL}/comment`, commentObject
//         );
//         return response.data.data;
//     }
//     catch (err) {
//         console.error(err);
//     }
// }

// delete comment
// export const deleteComment = async (commentID) => {
//     try {
//         const response = await axios.delete(`${rootURL}/comment/${commentID}`);
//         return response.data.data;
//     }
//     catch (err) {
//         console.error(err);
//     }
// }

// get like by id
// export const getLikeByID = async (likeID) => {
//     try {
//         const response = await axios.get(`${rootURL}/like/${likeID}`);
//         return response.data.data;
//     }
//     catch (err) {
//         console.error(err);
//     }
// }

// get likes by post ID
// export const getLikesByPostID = async (postID) => {
//     try {
//         const response = await axios.get(`${rootURL}/like?post=${postID}`);
//         return response.data.data;
//     }
//     catch (err) {
//         console.error(err);
//     }
// }

// create like
// export const createLike = async (likeObject) => {
//     try {
//         const response = await axios.post(
//             `${rootURL}/like`, likeObject
//         );
//         return response.data.data;
//     }
//     catch (err) {
//         console.error(err);
//     }
// }

// delete comment
// export const deleteLike = async (likeID) => {
//     try {
//         const response = await axios.delete(`${rootURL}/like/${likeID}`);
//         return response.data.data;
//     }
//     catch (err) {
//         console.error(err);
//     }
// }

export const getFollowers = async (userID) => {
  try {
    const response = await axios.get(`${rootURL}/user/${userID}`);
    return response.data.data.followers;
  } catch (err) {
    throw new Error(err);
  }
};

export const getSuggestedFollowings = async (userID) => {
  try {
    const users = await getUsers();
    const myFollowings = await getFollowings(userID);
    const suggestedList = [];

    for (let i = 0; i < users.length; i += 1) {
      if (users[i].followings.length > 0 && users[i]._id !== userID) {
        const intersection = myFollowings.filter((x) => users[i].followings.includes(x));
        // include users with >=3 common followings, exclude already followed users
        if (intersection.length >= 3 && !myFollowings.includes(users[i].id)) {
          suggestedList.push(users[i]);
        }
      }
    }
    return suggestedList;
  } catch (err) {
    throw new Error(err);
  }
};
