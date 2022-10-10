import { Avatar } from "@mui/material";
import Button from '@mui/material/Button';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import Chip from '@mui/material/Chip';
import DeleteIcon from '@mui/icons-material/Delete';
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

  const handleCancel = () => {
    console.info('You clicked the Cancek.');
  };

  const handleDelete = () => {
    console.info('You clicked the delete icon.');
  };

  return (
    <div className="detail-container">
      <div className="left-part">
        <img src={pic} alt="user-post" />
      </div>
      <div className="right-part">
        <div className="user-info">
          <Avatar />
          <div className="username">{username}</div>
          <Chip label="Delete" variant="outlined" onClick={handleDelete} />
          <Chip label="Cancel" variant="outlined" onClick={handleCancel} />
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