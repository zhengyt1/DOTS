import React, { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { message } from 'antd';
import Gallery from '../components/Gallery';
import Navbar from '../components/navbar';
import ProfileOverview from '../components/ProfileOverview';
import { getUser, getPostsByUserID } from '../mockedAPI/mockedAPI';

function Profile() {
  // const selfID = useSelector((state) => state.userID.value);
  const p = useParams();

  const profileID = p.userId;
  const navigate = useNavigate();
  const [selfID, setSelfID] = useState('selfId');
  const [username, SetUsername] = useState('');
  const [userAvatar, SetAvatar] = useState('');
  const [description, SetDescription] = useState('');
  const [followers, SetFollowers] = useState([]);
  const [followings, SetFollowings] = useState([]);
  const [posts, SetPosts] = useState([]);

  const [messageApi, contextHolder] = message.useMessage();
  useEffect(() => {
    // get the list of students from the backend
    async function fetchData() {
      try {
        const userData = await getUser(profileID);
        const data = await getUser('selfId');
        setSelfID(data._id);
        if (userData !== undefined) {
          SetUsername(userData.username);
          SetAvatar(userData.avatar);
          SetDescription(userData.description);
          SetFollowers(userData.followers);
          SetFollowings(userData.followings);
        }
        let postsData = await getPostsByUserID(profileID, selfID);
        postsData = postsData.sort(
          (a, b) => (a.createdTime > b.createdTime ? -1 : 1),
        );
        if (postsData !== undefined) {
          SetPosts(postsData);
        }
      } catch (e) {
        messageApi.error(e.message);
        setTimeout(() => { navigate('/'); }, 1000);
      }
    }
    fetchData();
    const interval = setInterval(() => {
      fetchData();
    }, 5000);
    return () => clearInterval(interval);
  }, [profileID]);

  return (
    <div>
      {/* {selfID === '' ? (
        <Link to="/">
          <div>Login error, click to login.</div>
        </Link>
      ) : ( */}
      {contextHolder}
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
      {/* )} */}
    </div>
  );
}

export default Profile;
