import { Avatar } from "@mui/material";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import './post.css'
import { useSelector } from 'react-redux';
import { useState, useEffect, useRef } from "react";
import { Link } from 'react-router-dom';
import { getUser, updatePost } from "../mockedAPI/mockedAPI";

function Post(props) {
  let {
    id,
    text,
    pic,
    video,
    owner,
    // comments,
    likes,
    // createdTime,
  } = props.postInfo;
  const selfID = useSelector(state => state.userID.value);

  const [username, setUsername] = useState("");
  const [avatar, setAvatar] = useState("");
  const [userID, setUserID] = useState("");
  const [isLike, setIsLike] = useState(likes.includes(selfID));
  const [totalLikes, setTotalLikes] = useState(likes);


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
  }, [isLike, totalLikes])

  const handleLikeClick = async () => {
    // Cancel like.
    setIsLike(false);
    let newLikes = totalLikes.filter((x) => x !== selfID);
    setTotalLikes(newLikes);
    await updatePost(id, "likes", newLikes);
  }

  const handleUnlikeClick = async () => {
    setIsLike(true);
    let newLikes = [...totalLikes, selfID];
    setTotalLikes(newLikes);
    await updatePost(id, "likes", newLikes);
  }

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
            {
              isLike ? (<FavoriteIcon onClick={handleLikeClick} className={"favIcon"} />) : (<FavoriteBorderIcon onClick={handleUnlikeClick} className={"notFavIcon"} />)
            }
            <div className="like">{totalLikes.length}</div>
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