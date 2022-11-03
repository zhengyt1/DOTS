import { Avatar } from "@mui/material";
import Button from '@mui/material/Button';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import Chip from '@mui/material/Chip';
import Modal from '@mui/material/Modal';
import './postDetail.css'
import { useEffect, useState } from "react";
import { useNavigate, useParams, } from 'react-router-dom';
import { getPostByID, getUser } from "../mockedAPI/mockedAPI";
import { useSelector } from "react-redux";

function PostDetail() {
  const userID = useSelector(state => state.userID.value);
  // console.log(userID);

  let postID = useParams()

  // console.log(postID);
  postID = postID.postId;
  
  const navigate = useNavigate()

  const handleEdit = () => {
    // console.info('You clicked the edit icon.');
  };

  const handleDelete = () => {
    // console.info('You clicked the delete icon.');
  };

  const handlePost = () => {
    // console.info('Post ...')
  }

  const handleClose = () => {
    navigate(-1);
    // navigate(`/${location.state.from}`)
  }

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
      // console.log(post);
      const userInfo = await getUser(post.owner);
      // console.log(userInfo)
      setUsername(userInfo.username);
      setAvatar(userInfo.avatar);
      
    }
    getData();

  }, [postID])
  console.log(userID, owner)
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
            {video ? (
              <video controls>
                <source src={video} type="video/mp4"></source>
              </video>
            ) : (
              <img src={pic} alt="user-post" />
            )}
          </div>
          <div className="right-part" >
              <div>
                <div className="user-info">
                  <Avatar src={avatar} />
                  <div className="username">{username}</div>
                  <span></span>
                  {owner === userID && (
                    <div>
                      <Chip label="Edit" variant="outlined" onClick={handleEdit} />
                      <span></span>
                      <Chip label="Delete" variant="outlined" onClick={handleDelete} />
                      <span></span>
                    </div>  
                  )}
                </div>
                <div className="text">{text}</div>
              </div>
              {/* <hr /> */}
            <div className="middle-part">
              {comments.map((item, key) => (
                <div key={key} className="comment-container">
                  <Avatar src={item.avatar} />
                  <div className="comment">
                    <div className="comment-text">{item.comment}</div>
                    <div className="time">{item.createdTime}</div>
                  </div>
                </div>
              )
              )}
            </div>
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
              <div className="post-comment">
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