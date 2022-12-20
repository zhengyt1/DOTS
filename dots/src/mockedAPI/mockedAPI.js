import axios from 'axios';
import { faker } from '@faker-js/faker';
// import { useHistory } from 'react-router-dom';
// import { Redirect } from 'react-router-dom';
// import React from 'react';
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
const selfId = 'selfId';

// Add the token to all HTTP request
const setHeaders = () => {
  axios.defaults.headers.common.Authorization = (sessionStorage.getItem('app-token') !== null) ? sessionStorage.getItem('app-token') : null;
};

export const reAuthenticate = async (status) => {
  if (status === 401) {
    // console.log('in reAuthenticate');
    // delete the token
    sessionStorage.removeItem('app-token');
  }
};

export const getUsers = async () => {
  try {
    setHeaders();
    const response = await axios.get(`${rootURL}/users`);
    return response.data.data;
    // the data is stored in the mockData
    // field of the response
  } catch (err) {
    reAuthenticate(401);
    throw new Error(err.response.data.message);
  }
};

// get user by id, pass in 'selfId' if the user is the logged in user
export const getUser = async (userID) => {
  try {
    setHeaders();
    const response = await axios.get(`${rootURL}/user/${userID}`);
    // console.log(userID, response);
    reAuthenticate(response.status);
    return response.data.data;
  } catch (err) {
    reAuthenticate(401);
    throw new Error(err.response.data.message);
  }
};

export const getUsersByIds = async (useIds) => {
  try {
    return Promise.all(
      useIds.map(async (id) => getUser(id)),
    );
  } catch (err) {
    reAuthenticate(401);
    throw new Error(err.response.data.message);
  }
};

// get user by email
export const getUserByEmail = async (email, password) => {
  try {
    const response = await axios.post(
      `${rootURL}/login`,
      { email, password },
    );
    sessionStorage.setItem('app-token', response.data.token);
    return response.data.token;
  } catch (err) {
    // reAuthenticate(401);
    throw new Error(err.response.data.message);
  }
};

// update user field by value
export const updateUser = async (userID, field, value) => {
  const payload = {};
  payload[field] = value;
  try {
    setHeaders();
    const response = await axios.put(
      `${rootURL}/user/${userID}`,
      payload,
    );
    reAuthenticate(response.status);
    return response.data.data;
  } catch (err) {
    reAuthenticate(401);
    throw new Error(err.response.data.message);
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
    sessionStorage.setItem('app-token', response.data.token);
    return response.data.token;
  } catch (err) {
    // reAuthenticate(401);
    throw new Error(err.response.data.message);
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
    setHeaders();
    // console.log(`getFollowings, ${rootURL}/user/${userID}`);
    const response = await axios.get(`${rootURL}/user/${userID}`);
    reAuthenticate(response.status);
    return response.data.data.followings;
    // the data is stored in the mockData
    // field of the response
  } catch (err) {
    reAuthenticate(401);
    throw new Error(err.response.data.message);
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
    setHeaders();
    const response = await axios.get(`${rootURL}/post/${postID}`);
    reAuthenticate(response.status);
    return response.data.data;
  } catch (err) {
    reAuthenticate(401);
    throw new Error(err.response.data.message);
  }
};

// get post by user ID => return array of posts

export const getPostsByUserID = async (ownerID, viewerID) => {
  try {
    setHeaders();
    const response = await axios.get(`${rootURL}/post?owner=${ownerID}`);
    const postList = response.data.data;
    reAuthenticate(response.status);
    if (ownerID === viewerID) {
      return response.data.data;
    }
    const filteredList = [];
    for (let i = 0; i < postList.length; i += 1) {
      if (!postList[i].isPrivate) {
        filteredList.push(postList[i]);
      }
    }
    return filteredList;
  } catch (err) {
    reAuthenticate(401);
    throw new Error(err.response.data.message);
  }
};

// live update only when the feed length changed
export const checkFeedLen = async (userID) => {
  try {
    setHeaders();
    const followings = await getFollowings(selfId);
    const run = async () => Promise.all(
      followings.map(async (id) => getPostsByUserID(id, userID)),
    );
    const posts = await run();
    const flatArr = posts.flat();
    return flatArr.length;
  } catch (err) {
    reAuthenticate(401);
    throw new Error(err);
  }
};

export const getFeed = async (userID, page, limit) => {
  try {
    setHeaders();
    const followings = await getFollowings(selfId);
    const run = async () => Promise.all(
      followings.map(async (id) => getPostsByUserID(id, userID)),
    );
    const posts = await run();
    const flatArr = posts.flat().sort((a, b) => (a.createdTime > b.createdTime ? -1 : 1));

    const currentPage = flatArr.slice(limit * page, limit * page + limit);

    return currentPage;
  } catch (err) {
    reAuthenticate(401);
    throw new Error(err);
  }
};

// update post field by value
export const updatePost = async (postID, field, value) => {
  const payload = {};
  payload[field] = value;
  try {
    setHeaders();
    const response = await axios.put(
      `${rootURL}/post/${postID}`,
      payload,
    );
    reAuthenticate(response.status);
    return response.data.data;
  } catch (err) {
    reAuthenticate(401);
    throw new Error(err.response.data.message);
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
    setHeaders();
    const response = await axios.post(`${rootURL}/post`, postObject);
    reAuthenticate(response.status);
    return response.data.data;
  } catch (err) {
    reAuthenticate(401);
    throw new Error(err.response.data.message);
  }
};

// delete post
export const deletePost = async (postID) => {
  try {
    setHeaders();
    const response = await axios.delete(`${rootURL}/post/${postID}`);
    reAuthenticate(response.status);
    return response.data.data;
  } catch (err) {
    reAuthenticate(401);
    throw new Error(err.response.data.message);
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
    setHeaders();
    const response = await axios.get(`${rootURL}/user/${userID}`);
    reAuthenticate(response.status);
    return response.data.data.followers;
  } catch (err) {
    reAuthenticate(401);
    throw new Error(err.response.data.message);
  }
};

export const getSuggestedFollowings = async (userID) => {
  try {
    setHeaders();
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
    reAuthenticate(401);
    throw new Error(err);
  }
};
