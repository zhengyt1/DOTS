import React, { useEffect, useState, useRef } from 'react';
// import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Stack } from '@mui/material';
import { message } from 'antd';
import Navbar from '../components/navbar';
import Rightbar from '../components/rightbar';
import Feed from '../components/feed';
import './home.css';
import Share from '../components/share';
import { getFeed, getUser } from '../mockedAPI/mockedAPI';

function Home() {
  const [posts, setPosts] = useState([]);
  const [userID, setUserID] = useState('selfId');
  const loadFeed = useRef(false);
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  useEffect(() => {
    setUserID(sessionStorage.getItem('app-token'));
    async function fetchFeed() {
      try {
        const user = await getUser('selfId');
        if (!user._id) {
          messageApi.error('userID is empty, need to loggin first. Go back to /.');
          navigate('/');
          return;
        }
        setUserID(user._id);
        const data = await getFeed(user._id);
        setPosts(data);
      } catch (e) {
        messageApi.error(e.message);
        setTimeout(() => { navigate('/'); }, 1000);
      }
    }
    if (loadFeed.current === false) {
      // console.log("loadFeed");
      fetchFeed();
      loadFeed.current = true;
    }
    const interval = setInterval(() => {
      fetchFeed();
    }, 5000);
    return () => clearInterval(interval);
  });
  return (
    <div>
      {contextHolder}
      <Navbar />
      <Stack direction="row" spacing={2} justifyContent="space-between">
        <Stack direction="column" spacing={2} justifyContent="space-between" flex={6}>
          <Share />
          <Feed posts={posts} />
        </Stack>
        <Rightbar userID={userID} />
      </Stack>
    </div>
  );
}

export default Home;
