import { Avatar } from "@mui/material";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import './post.css'
import { useState, useEffect, useRef } from "react";
import { Link } from 'react-router-dom';
import PostDetail from "./postDetail";
import { getUser, getPosts, getFeed, getPostsByUserID } from "../mockedAPI/mockedAPI";

function Post(props) {
  let {
    id,
    text,
    pic,
    video,
    owner,
    comments,
    likes,
    createdTime,
  } = props.postInfo;

  const [username, setUsername] = useState("");
  const [avatar, setAvatar] = useState("");
  const [userID, setUserID] = useState("");
  const loadData = useRef(true);
  useEffect(() => {
    async function fetchData() {
      const data = await getUser(owner);
      if (data !== undefined) {
        setUsername(data.username);
        setAvatar(data.avatar);
        setUserID(data.id)
      }
    }
    // only load data on the first rendering 
    if (loadData.current === true) {
      loadData.current = false;
      fetchData();
    }
  })

  return (
    <div className="post-container">
      <div className="post" >
        <div className="person-info">
          <Link to={`/profile/${userID}`} key={`${userID}`} >
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
            <img src={pic} alt='post-pic'></img>
          )}
          {video && (
            <video controls>
              <source src={video} type="video/mp4"></source>
            </video>
          )}
          <div className="icon-bar">
            <FavoriteBorderIcon />
            <div className="like">{likes.length}</div>
            <Link to={`/post/${id}`} key={`${id}`} >
              <ChatBubbleOutlineIcon />
            </Link>
            <input className="write-comment" placeholder="write a comment"></input>
          </div>
        </div>
      </div>
      {/* <ol className="comment-container">
        {comments.map((item, key) => (
          <li key={key}>
            <Avatar />
            <div className="username">{item.user}</div>
            <div className="username">{item.comment}</div>
          </li>
        ))}
      </ol> */}
    </div>
  )
}

export default Post;