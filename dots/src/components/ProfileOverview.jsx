/* eslint-disable no-nested-ternary */
import { ExpandMore } from '@mui/icons-material';
import { Avatar, Button, IconButton } from '@mui/material';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { getFollowings, updateUser, getFollowers } from '../mockedAPI/mockedAPI';

function ProfileOverview(props) {
  const {
    selfID,
    profileID,
    username,
    userAvatar,
    description,
    numOfFollowings,
    numOfPosts,
  } = props;
  const [isFollowing, setIsFollowing] = useState(false);
  const [selfFollowingList, SetSelfFollowingList] = useState([]);
  const [profileFollowerList, SetProfileFollowerList] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const followingList = await getFollowings(selfID);
      // console.log(followingList);
      if (followingList !== undefined) {
        SetSelfFollowingList(followingList);
        if (followingList.includes(profileID)) {
          setIsFollowing(true);
        } else {
          setIsFollowing(false);
        }
      }
      const followersList = await getFollowers(profileID);
      if (followersList !== undefined) {
        SetProfileFollowerList(followersList);
      }
    }
    fetchData();
    const interval = setInterval(() => {
      fetchData();
    }, 5000);
    return () => clearInterval(interval);
  }, [profileID, selfID]);
  const handleUnfollowClick = async () => {
    // We can change this logic to backend and add a new api: FollowerUser
    setIsFollowing(false);

    const newFollowingList = selfFollowingList.filter((
      value,
    ) => value !== profileID);

    const newFollowerList = profileFollowerList.filter((
      value,
    ) => value !== selfID);

    SetSelfFollowingList(newFollowingList);
    SetProfileFollowerList(newFollowerList);

    await updateUser(
      selfID,
      'followings',
      newFollowingList,
    );

    await updateUser(
      profileID,
      'followers',
      newFollowerList,
    );
  };

  const handleFollowClick = async () => {
    // We can change this logic to backend and add a new api: UnFollowerUser
    setIsFollowing(true);

    const newFollowingList = [...selfFollowingList, profileID];
    const newFollowerList = [...profileFollowerList, selfID];

    SetSelfFollowingList(newFollowingList);
    SetProfileFollowerList(newFollowerList);

    await updateUser(
      selfID,
      'followings',
      newFollowingList,
    );

    await updateUser(
      profileID,
      'followers',
      newFollowerList,
    );
  };

  return (
    <div>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottom: '1px solid grey',
      }}
      >
        <div style={{ margin: 10 }}>
          <Avatar
            alt={username}
            src={userAvatar}
            sx={{ width: 100, height: 100 }}
          />
        </div>
        <div style={{ marginLeft: 60 }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',

          }}
          >
            <div style={{
              marginRight: 30, height: 40, lineHeight: '40px', display: 'inline-block', verticalAlign: 'middle',
            }}
            >
              <h2>{username}</h2>
            </div>
            {
            selfID !== profileID
              ? (
                isFollowing
                  ? (<Button variant="outlined" size="small" onClick={handleUnfollowClick} sx={{ width: '100px' }}>Unfollow</Button>)
                  : (<Button variant="contained" size="small" onClick={handleFollowClick} sx={{ width: '100px' }}>Follow</Button>)
              )
              : (<Button variant="outlined" size="small">Settings</Button>)
            }
            <IconButton>
              <ExpandMore />
            </IconButton>

          </div>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            margin: '10px 0px',
          }}
          >
            <h5>
              {numOfPosts}
              {' '}
              posts
            </h5>
            <h5>
              {numOfFollowings}
              {' '}
              followings
            </h5>
            <h5>
              {profileFollowerList.length}
              {' '}
              followers
            </h5>
          </div>
          <div>
            <h5>
              About me:
              {' '}
              {description}
            </h5>
          </div>
        </div>

      </div>

    </div>
  );
}

ProfileOverview.propTypes = {
  selfID: PropTypes.string.isRequired,
  profileID: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  userAvatar: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  numOfFollowings: PropTypes.number.isRequired,
  numOfPosts: PropTypes.number.isRequired,
};
export default ProfileOverview;
