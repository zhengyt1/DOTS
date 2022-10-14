import { Avatar } from "@mui/material";
import Button from '@mui/material/Button';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import Chip from '@mui/material/Chip';
import { Cancel } from "@mui/icons-material";
import Modal from '@mui/material/Modal';
import './postDetail.css'
import { useEffect, useState, useRef } from "react";
import { Link, useNavigate, useLocation, } from 'react-router-dom';
import { getPostByID, getUser } from "../mockedAPI/mockedAPI";

function PostDetail(props) {
  const location = useLocation();
  const postID = location.pathname.split("/")[2];
  console.log(postID);
  // console.log(postID);
  // const postInfo = {
  //   text: "It’s finally here! Catch our latest summer collection, “Juniper Valley,” and use code BELLEJUNI to get 10% off your first order. alalalalalalalalallalalala, It’s finally here! Catch our latest summer collection, “Juniper Valley,” and use code BELLEJUNI to get 10% off your first order. alalalalalalalalallalalalaIt’s finally here! Catch our latest summer collection, “Juniper Valley,” and use code BELLEJUNI to get 10% off your first order. alalalalalalalalallalalalaIt’s finally here! Catch our latest summer collection, “Juniper Valley,” and use code BELLEJUNI to get 10% off your first order. alalalalalalalalallalalala",
  //   // pic: "https://source.unsplash.com/random",
  //   pic: "/asset/photo.jpg",
  //   video: "",
  //   owner: "1",
  //   comments: [{user: "yuting", comment: "Love your Post!"},{user: "shuyue", comment: "hhhh"}],
  //   likes: [],
  //   createdTime: "March 19",
  // };
  const navigate = useNavigate()
  // let {
  //   // text,
  //   pic,
  //   video,
  //   owner,
  //   comments,
  //   likes,
  //   createdTime,
  // } = postInfo;
  // const username = "Tony Danzy";

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

  const handleClose = () => {
    navigate(-1);
    // navigate(`/${location.state.from}`)
  }

  const loadData = useRef(true);
  const [text, setText] = useState("");
  const [pic, setPic] = useState("");
  const [video, setVideo] = useState("");
  const [owner, setOwner] = useState("");
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState([]);
  const [createdTime, setCreatTime] = useState("");
  const [username, setUsername] = useState("");
  const [avatar, setAvatar] = useState("");
  useEffect(() => {
    async function getData() {
      const post = await getPostByID(postID);
      setText(post.text);
      setPic(post.pic);
      setOwner(post.owner);
      setVideo(post.video);
      setComments(post.comments);
      setLikes(post.likes);
      setCreatTime(post.createdTime);
      console.log(post);

      const userInfo = await getUser(post.owner);
      console.log(userInfo);
      console.log(userInfo)
      setUsername(userInfo.username);
      setAvatar(userInfo.avatar);
    
    }

    if (loadData.current === true) {
      loadData.current = false;
      getData();
    }
  })

  return (
    // <div className="post-background">
    //   <Cancel onClick={handleCancel} />
      <Modal
        open={true}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="detail-container">
          <div className="left-part">
            <img src={pic} alt="user-post" />
          </div>
          <div className="right-part">
            <div className="user-info">
              <Avatar src={avatar} />
              <div className="username">{username}</div>
              <span></span>
              <Chip label="Edit" variant="outlined" onClick={handleEdit} />
              <span></span>
              <Chip label="Delete" variant="outlined" onClick={handleDelete} />
              <span></span>
            </div>
            <hr />
            <div className="text">{text}</div>
            <div className="bottom">
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
      </Modal>
    // </div> 
  )
}


export default PostDetail