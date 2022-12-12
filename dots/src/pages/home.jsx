import React, { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Stack } from '@mui/material';
import { message } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';
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
  const [messageApi, contextHolder] = message.useMessage();
  const [page, setPage] = useState(1);
  const [hasMoreData, setHasMoreData] = useState(true);
  const DATALEN = 2;

  useEffect(() => {
    async function fetchFeed() {
      const data = await getFeed(userID, 0, DATALEN);
      setPosts(data);
    }
    if (userID === '') {
      messageApi.info('userID is empty, need to loggin first. Go back to /.');
    }
    if (loadFeed.current === false && userID !== '') {
      // console.log("loadFeed");
      fetchFeed();
      loadFeed.current = true;
    }
  });

  const fetchNext = async () => {
    const data = await getFeed(userID, page, DATALEN);
    setPosts([...posts, ...data]);
    if (data.length === 0 || data.length < DATALEN) {
      setHasMoreData(false);
    }
    setPage(page + 1);
  };

  return (
    <div>
      {contextHolder}
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
              <InfiniteScroll
                dataLength={posts.length}
                next={fetchNext}
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
      )}
    </div>
  );
}

export default Home;
