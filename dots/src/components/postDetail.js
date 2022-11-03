import { Avatar, Popper } from "@mui/material";
import Button from '@mui/material/Button';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import Chip from '@mui/material/Chip';
import Modal from '@mui/material/Modal';
import './postDetail.css'
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams, } from 'react-router-dom';
import { getPostByID, getUser, updatePost } from "../mockedAPI/mockedAPI";
import { useSelector } from "react-redux";
import { Fragment } from "react";
import { async } from "@firebase/util";

// function EditComment(props) {
//   const [open, setOpen] = useState(false);
//   const comment = useRef("");
//   const handleOpen = () => {
//     setOpen(true);
//   };
//   const handleCloseEdit = async(e) => {
//     setOpen(false);

//     if (e.target.textContent === "Save") {
     
//     }
//   };

//   return (
//     <Fragment>
//       <Button onClick={handleOpen}>Edit</Button>
//       <Modal
//         hideBackdrop
//         open={open}
//         onClose={handleCloseEdit}
//         aria-labelledby="child-modal-title"
//         aria-describedby="child-modal-description"
//       >
//         <div className="commentEdit-container">
//           <h2 id="child-modal-title">Edit your comment</h2>
//           {/* <input id="comment-input" className="comment-input" placeholder="Add a comment ..." onChange={handleComment}></input> */}
//           <Button onClick={handleCloseEdit}>Close</Button>
//           <Button onClick={handleCloseEdit}>Save</Button>
//         </div>
//       </Modal>
//     </Fragment>
//   )
// }
function PostDetail() {
  const userID = useSelector(state => state.userID.value);
  const comment = useRef("");
  const newComment = useRef("");

  const [text, setText] = useState("");
  const [pic, setPic] = useState("");
  const [video, setVideo] = useState("");
  const [owner, setOwner] = useState("");
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState([]);
  const [createdTime, setCreatTime] = useState("");
  const [username, setUsername] = useState("");
  const [avatar, setAvatar] = useState("");
  const [loggedInUserAvatar, setLoggedInUserAvatar] = useState("");
  const [isEditComments, setIsEditComments] = useState([]);
  let postID = useParams();

  // console.log(postID);
  postID = postID.postId;
  
  const navigate = useNavigate()

  const handleEdit = () => {
    // console.info('You clicked the edit icon.');
  };
  const handleEditComment = async(index, status) => {
    let new_isEditComments;
    switch (status) {
      case "open":
        newComment.current = comments[index].comment;
        new_isEditComments = isEditComments.slice(0, index).concat(true).concat(isEditComments.slice(index + 1));
        setIsEditComments(new_isEditComments);
        break;
      case "cancel":
        new_isEditComments = isEditComments.slice(0, index).concat(false).concat(isEditComments.slice(index + 1));
        setIsEditComments(new_isEditComments);
        break;
      case "confirm":
        if (newComment.current === "") {
          alert("comment cann't be empty");
          break;
        }
        new_isEditComments = isEditComments.slice(0, index).concat(false).concat(isEditComments.slice(index + 1));
        console.log(new_isEditComments)
        setIsEditComments(new_isEditComments);
        const new_comment = {
          "ownerID": comments[index].ownerID,
          "avatar": comments[index].avatar,
          "comment": newComment.current,
          "createdTime": comments[index].createdTime
        };
        newComment.current = "";
        const new_comments = comments.slice(0, index).concat(new_comment).concat(comments.slice(index + 1));
        setComments(new_comments);
        await updatePost(postID, "comments", new_comments);
        break;
      default:
        alert('edit status error')
    }
  };

  const handleDelete = () => {
    // console.info('You clicked the delete icon.');
  };

  const handlePost = async() => {
    console.info('Post ...')
    if (comment.current === "") {
      alert('Please enter a comment.');
      return;
    }

    const newComment = {
      "ownerID": userID,
      "avatar": loggedInUserAvatar,
      "comment": comment.current,
      "createdTime": new Date(Date.now()).toISOString(),
    }
    console.log(newComment["createdTime"])
    setComments( comments =>
      [...comments, newComment]
    )
    setIsEditComments([...isEditComments, false])
    const data = await updatePost(postID, "comments", [...comments, newComment])
    console.log( [...comments, newComment], data)
    comment.current = ""
    document.getElementById("comment-input").value = ""
  }

  const handleDeleteComment = async(index) => {
    const new_isEditComments = isEditComments.slice(0, index).concat(isEditComments.slice(index + 1));
    setIsEditComments(new_isEditComments);
    const new_comments = comments.slice(0, index).concat(comments.slice(index + 1));
    setComments(new_comments);
    await updatePost(postID, "comments", new_comments);
  }

  const handleClose = () => {
    navigate(-1);
    // navigate(`/${location.state.from}`)
  }

  function handleComment(e) {
    comment.current = (e.target.value);
  }

  useEffect(() => {
    console.log('in useEffect')
    async function getData() {
      const post = await getPostByID(postID);
      setText(post.text);
      setPic(post.pic);
      setOwner(post.owner);
      setVideo(post.video);
      setComments(post.comments);
      setIsEditComments(Array.apply(null, Array(post.comments.length)).map(function (x, i) { return false; }))
      setLikes(post.likes);
      setCreatTime(post.createdTime);
      // console.log(post);
      const userInfo = await getUser(post.owner);
      // console.log(userInfo)
      setUsername(userInfo.username);
      setAvatar(userInfo.avatar);
      const loggedInUser = await getUser(userID);
      setLoggedInUserAvatar(loggedInUser.avatar);
    }
    getData();

  }, [postID, userID])
  console.log("miao", isEditComments)
  console.log(comments)
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
            <div className="middle-part">
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
              {comments.map((item, key) => (
                <div key={key} className="comment-container">
                  <Avatar src={item.avatar} />
                  <div className="comment">
                    {isEditComments[key] ? (
                      <div>
                        {/* <div className="comment-text">{item.comment}</div> */}
                        <input className="comment-text" defaultValue={item.comment} onChange={(e) => newComment.current = e.target.value}></input>
                        {userID === item.ownerID ? (
                          <div className="comment-operators">
                            <div className="time">{item.createdTime}</div>
                              <div className="comment-edit" onClick={() => handleEditComment(key, 'confirm')} >Confirm</div>
                              <div className="comment-edit" onClick={() => handleEditComment(key, 'cancel')} >Cancel</div>
                          </div>
                        ):(
                          <div className="time">{item.createdTime}</div>
                        )}
                      </div>
                    ) : (
                      <div>
                        <div className="comment-text">{item.comment}</div>
                        {userID === item.ownerID ? (
                          <div className="comment-operators">
                            <div className="time">{item.createdTime}</div>
                              <div className="comment-edit" onClick={() => handleEditComment(key, 'open')} >Edit</div>
                              <div className="comment-edit" onClick={() => handleDeleteComment(key)} >Delete</div>
                          </div>
                        ):(
                          <div className="time">{item.createdTime}</div>
                        )}
                      </div>
                    )}
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
                <input id="comment-input" className="comment-input" placeholder="Add a comment ..." onChange={handleComment}></input>
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