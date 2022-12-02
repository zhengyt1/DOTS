import React, { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Stack } from '@mui/material';
import Navbar from '../components/navbar';
import Rightbar from '../components/rightbar';
import Feed from '../components/feed';
import './home.css';
import Share from '../components/share';
import { getFeed } from '../mockedAPI/mockedAPI';

function Home() {
  const userID = useSelector((state) => state.userID.value);
  // console.log(userID);

  const [posts, setPosts] = useState([]);
  const loadFeed = useRef(false);

  useEffect(() => {
    async function fetchFeed() {
      const data = await getFeed(userID);
      setPosts(data);
    }
    if (userID === '') {
      window.alert('userID is empty, need to loggin first. Go back to /.');
    }
    if (loadFeed.current === false && userID !== '') {
      // console.log("loadFeed");
      fetchFeed();
      loadFeed.current = true;
    }
  });

  return (
    <div>
      {userID === '' ? (
        <Link to="/">
          <div>Login error, click to login.</div>
        </Link>
      ) : (
        <div>
          <Navbar />
          <Stack direction="row" spacing={2} justifyContent="space-between">
            <Stack direction="column" spacing={2} justifyContent="space-between" flex={6}>
              <Share />
              <Feed posts={posts} />
            </Stack>
            <Rightbar userID={userID} />
          </Stack>
        </div>
      )}
    </div>
  );
}

export default Home;
