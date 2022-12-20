import React, { useEffect, useState, useRef } from 'react';
// import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Stack } from '@mui/material';
import { message } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';
import Navbar from '../components/navbar';
import Rightbar from '../components/rightbar';
import Feed from '../components/feed';
import './home.css';
import Share from '../components/share';
import { checkFeedLen, getFeed, getUser } from '../mockedAPI/mockedAPI';

function Home() {
  const [posts, setPosts] = useState([]);
  const [userID, setUserID] = useState('selfId');
  const loadFeed = useRef(false);
  const feedLen = useRef(0);
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [hasMoreData, setHasMoreData] = useState(true);
  const DATALEN = 2;

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
        const data = await getFeed(user._id, 0, DATALEN);
        const newFeedLen = await checkFeedLen(userID);
        feedLen.current = newFeedLen;
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
    if (sessionStorage.getItem('scrollPosition') !== 'null') {
      setTimeout(() => {
        window.scrollTo(0, sessionStorage.getItem('scrollPosition'));
      }, 2);

      // Not a good idea, but can work
      setTimeout(() => {
        setTimeout(sessionStorage.setItem('scrollPosition', null));
      }, 2000);
    }

    const interval = setInterval(async () => {
      const newFeedLen = await checkFeedLen(userID);
      if (newFeedLen > feedLen.current) {
        feedLen.current = newFeedLen;
        fetchFeed();
        setHasMoreData(true);
        setPage(1);
        message.info('New posts in your feed');
      } else {
        feedLen.current = newFeedLen;
      }
    }, 5000);
    return () => clearInterval(interval);
  });

  const fetchNext = async () => {
    const data = await getFeed(userID, page, DATALEN);
    setPosts([...posts, ...data]);
    if (data.length === 0 || data.length < DATALEN) {
      setHasMoreData(false);
    }
    setPage(page + 1);
  };

  const fetchNextDelayed = async () => {
    setTimeout(fetchNext, 1000);
  };

  return (
    <div>
      {contextHolder}
      <Navbar />
      <Stack direction="row" spacing={2} justifyContent="space-between">
        <Stack direction="column" spacing={2} justifyContent="space-between" flex={6}>
          <Share />
          <InfiniteScroll
            dataLength={posts.length}
            next={fetchNextDelayed}
            hasMore={hasMoreData}
            loader={(
              <p style={{ textAlign: 'center' }}>
                <b>Loading...</b>
              </p>
            )}
            endMessage={(
              <p style={{ textAlign: 'center' }}>
                <b>Yay! You have seen it all</b>
              </p>
            )}
          >
            <Feed posts={posts} />
          </InfiniteScroll>
          {/* <Feed posts={posts} /> */}
        </Stack>
        <Rightbar userID={userID} />
      </Stack>
    </div>
  );
}

export default Home;
