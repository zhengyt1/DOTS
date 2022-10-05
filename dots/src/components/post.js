import { Avatar } from "@mui/material";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import './post.css'

function Post(props) {
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
  // const avatar = "url(https://source.unsplash.com/random)"
  const avatar = ""

  console.log("in post")

  console.log(text)
  return (
    <div className="post-container">
      <div className="post">
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
            <ChatBubbleOutlineIcon />
            <input className="write-comment" placeholder="write a comment"></input>
          </div>
        </div>
      </div>
      <ol className="comment-container">
        {comments.map((item, key) => (
          <li key={key}>
            <Avatar />
            <div className="username">{item.user}</div>
            <div className="username">{item.comment}</div>
          </li>
        ))}
      </ol>
    </div>
  )
}

export default Post;