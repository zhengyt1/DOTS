import { Avatar } from "@mui/material";
import Button from '@mui/material/Button';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';

import './postDetail.css'

function PostDetail(props) {
  const {
    text,
    pic,
    video,
    owner,
    comments,
    likes,
    createdTime,
  } = props.postInfo;
  const username = "Tony Danzy";
  return (
    <div className="detail-container">
      <div className="left-part">
        <img src={pic}/>
      </div>
      <div className="right-part">
        <div className="user-info">
          <Avatar />
          <div className="username">{username}</div>
        </div>
        <hr />
        <div className="text">{text}</div>
        <hr />
        <div className="statistic">
          <div className="icons">
            <FavoriteBorderIcon />
            <span></span>
            <ChatBubbleOutlineIcon />
          </div>
          <div className="like">{likes.length} likes</div>
          <div className="time">{createdTime}</div>
        </div>
        <div className="comment">
          <input className="comment-input" placeholder="Add a comment ..."></input>
          <Button>Post</Button>
        </div>
      </div>
    </div>
  )
}


export default PostDetail