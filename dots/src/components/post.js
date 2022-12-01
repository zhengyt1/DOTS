import { useSelector } from 'react-redux';
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Mention, MentionsInput } from 'react-mentions';
import PropTypes from 'prop-types';
import { message } from 'antd';
import { Avatar } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import Button from '@mui/material/Button';
import './post.css';
import { getUser, getUsers, updatePost } from '../mockedAPI/mockedAPI';

function Post(props) {
  const [messageApi, contextHolder] = message.useMessage();

  const { postInfo } = props;
  const {
    _id,
    text,
    pic,
    video,
    owner,
    comments,
    likes,
    // createdTime,
  } = postInfo;
  const selfID = useSelector((state) => state.userID.value);

  const [commentValue, setCommentValue] = useState('');
  const [username, setUsername] = useState('');
  const [avatar, setAvatar] = useState('');
  const [userID, setUserID] = useState('');
  const [isLike, setIsLike] = useState(likes.includes(selfID));
  const [totalLikes, setTotalLikes] = useState(likes);
  const [selfAvatar, setSelfAvatar] = useState('');

  const loadData = useRef(true);
  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getUser(owner);
        if (data !== undefined) {
          setUsername(data.username);
          setAvatar(data.avatar);
          setUserID(data._id);
        }
        const selfData = await getUser(selfID);
        if (selfData !== undefined) {
          setSelfAvatar(selfData.avatar);
        }
      } catch (e) {
        throw new Error(e);
      }
    }

    // only load data on the first rendering
    if (loadData.current === true) {
      loadData.current = false;
      fetchData();
    }
  });
  const fetchMentionUsers = async (query, callBack) => {
    try {
      const allUsers = await getUsers();
      const transformedAllUsers = allUsers.map((u) => ({ _id: u._id, display: u.username }));
      if (!query) {
        callBack(transformedAllUsers);
      } else {
        const filteredUsers = transformedAllUsers.filter(
          (user) => user.display.toLowerCase().includes(query.toLowerCase()),
        );
        callBack(filteredUsers);
      }
    } catch (error) {
      throw new Error(error);
    }
  };

  const handleLikeClick = async () => {
    // Cancel like.
    setIsLike(false);
    const newLikes = totalLikes.filter((x) => x !== selfID);
    setTotalLikes(newLikes);
    try {
      await updatePost(_id, 'likes', newLikes);
    } catch (e) {
      throw new Error(e);
    }
  };

  const handleUnlikeClick = async () => {
    setIsLike(true);
    const newLikes = [...totalLikes, selfID];
    setTotalLikes(newLikes);
    try {
      await updatePost(_id, 'likes', newLikes);
    } catch (e) {
      throw new Error(e);
    }
  };

  const handlePost = async () => {
    // console.info('Post ...')
    if (commentValue === '') {
      messageApi.info('Please enter a comment.');
      return;
    }

    const newComment = {
      ownerID: selfID,
      avatar: selfAvatar,
      comment: commentValue,
      createdTime: new Date(Date.now()).toISOString(),
    };
    try {
      await updatePost(_id, 'comments', [...comments, newComment]);
    } catch (e) {
      throw new Error(e);
    }
    setCommentValue('');
  };
  return (
    <div className="post-container">
      {contextHolder}
      <div className="post">
        <div className="person-info">
          <Link to={`/profile/${userID}`} key={`${userID}`}>
            <Avatar
              sx={{ width: 40, height: 40 }}
              src={avatar}
            />
          </Link>
          <div className="name">{username}</div>
        </div>
        <div className="display-container">
          <div className="text">{text}</div>
          {pic && (
            <img src={pic} alt="post-pic" />
          )}
          {video && (
            <video controls>
              <source src={video} type="video/mp4" />
            </video>
          )}
          <div className="icon-bar">
            {
              isLike ? (<FavoriteIcon onClick={handleLikeClick} data-testid={`like-${_id}`} className="favIcon" />) : (<FavoriteBorderIcon onClick={handleUnlikeClick} data-testid={`unlike-${_id}`} className="notFavIcon" />)
            }
            <div className="like">{totalLikes.length}</div>
            <Link to={`/post/${_id}`} key={`${_id}`}>
              <ChatBubbleOutlineIcon />
            </Link>
            <MentionsInput
              singleLine
              className="mentions"
              data-testid="comment-input"
              value={commentValue}
              onChange={(e) => setCommentValue(e.target.value)}
              placeholder="Mention people using @"
            >
              <Mention
                data={fetchMentionUsers}
                trigger="@"
                markup="@@@____id__^^^____display__@@@__"
                appendSpaceOnAdd
                style={{ backgroundColor: '#cee4e5' }}
              />
            </MentionsInput>
            {/* <input className="write-comment" placeholder="write a comment"></input> */}
            <Button onClick={handlePost}>Post</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

const postShape = {
  _id: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  pic: PropTypes.string.isRequired,
  video: PropTypes.string.isRequired,
  owner: PropTypes.string.isRequired,
  comments: PropTypes.array.isRequired,
  likes: PropTypes.array.isRequired,
};
Post.propTypes = {
  postInfo: PropTypes.shape(postShape).isRequired,
};

export default Post;
