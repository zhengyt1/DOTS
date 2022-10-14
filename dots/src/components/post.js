import { Avatar } from "@mui/material";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import './post.css'
import { useState, useEffect, useRef } from "react";
import { Link } from 'react-router-dom';
import PostDetail from "./postDetail";
import { getUser, getPosts, getFeed, getPostsByUserID } from "../mockedAPI/mockedAPI";

function Post(props) {
  const {
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
  const loadData = useRef(true);
  useEffect(() => {
    async function fetchData() {
      const data = await getUser(owner);
      // console.log("post data: ", data);
      if (data !== undefined) {
        setUsername(data.username);
        setAvatar(data.avatar)
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
            <Avatar 
              sx={{ width: 40, height: 40}}
              src = {avatar}
            />
            <div className="name">{username}</div>
          </div>
          <div>
            <div className="text">{text}</div>
            <img src={pic} alt='post-pic'></img>
            <div className="icon-bar">
              <FavoriteBorderIcon />
              <div className="like">{likes.length}</div>
              <Link to={`/post/${id}`} >
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