import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import Gallery from '../components/Gallery';
import Navbar from '../components/navbar';
import ProfileOverview from '../components/ProfileOverview';
import { getUser, getPostsByUserID } from '../mockedAPI/mockedAPI';

function Profile() {
  const selfID = useSelector((state) => state.userID.value);
  const p = useParams();

  const profileID = p.userId;
  const [username, SetUsername] = useState('');
  const [userAvatar, SetAvatar] = useState('');
  const [description, SetDescription] = useState('');
  const [followers, SetFollowers] = useState([]);
  const [followings, SetFollowings] = useState([]);
  const [posts, SetPosts] = useState([]);

  useEffect(() => {
    // get the list of students from the backend
    async function fetchData() {
      const userData = await getUser(profileID);
      if (userData !== undefined) {
        SetUsername(userData.username);
        SetAvatar(userData.avatar);
        SetDescription(userData.description);
        SetFollowers(userData.followers);
        SetFollowings(userData.followings);
      }
      const postsData = await getPostsByUserID(profileID);
      if (postsData !== undefined) {
        SetPosts(postsData);
      }
    }

    fetchData();
  }, [profileID, selfID]);

  return (
    <div>
      {selfID === '' ? (
        <Link to="/">
          <div>Login error, click to login.</div>
        </Link>
      ) : (
        <div>
          <Navbar />
          <ProfileOverview
            selfID={selfID}
            profileID={profileID}
            username={username}
            userAvatar={userAvatar}
            description={description}
            numOfFollowers={followers.length}
            numOfFollowings={followings.length}
            numOfPosts={posts.length}
          />
          <Gallery posts={posts} saved={[]} />
        </div>
      )}
    </div>
  );
}

export default Profile;
