import { Avatar } from "@mui/material";
import Button from '@mui/material/Button';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import Chip from '@mui/material/Chip';
import { Cancel } from "@mui/icons-material";
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

  const handleEdit = () => {
    console.info('You clicked the edit icon.');
  };

  const handleDelete = () => {
    console.info('You clicked the delete icon.');
  };

  const handleCancel = () => {
    console.info('You clicked the cancel icon.');
  }

  const handlePost = () => {
    console.info('Post ...')
  }

  return (
    <div className="post-background">
      <Cancel onClick={handleCancel} />
      <div className="detail-container">
        <div className="left-part">
          <img src={pic} alt="user-post" />
        </div>
        <div className="right-part">
          <div className="user-info">
            <Avatar />
            <div className="username">{username}</div>
            <Chip label="Edit" variant="outlined" onClick={handleEdit} />
            <Chip label="Delete" variant="outlined" onClick={handleDelete} />
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
            <Button onClick={handlePost}>Post</Button>
          </div>
        </div>
      </div>
    </div>
  )
}


export default PostDetail