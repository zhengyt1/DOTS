import { Avatar } from "@mui/material";
import Button from '@mui/material/Button';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import Chip from '@mui/material/Chip';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Modal from '@mui/material/Modal';
import './postDetail.css'
import { Mention, MentionsInput } from "react-mentions";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams, } from 'react-router-dom';
import { deletePost, getPostByID, getUser, updatePost, getUsers } from "../mockedAPI/mockedAPI";
import { useSelector } from "react-redux";
import EditPost from "./EditPost";

function PostDetail() {
  const userID = useSelector(state => state.userID.value);
  const newComment = useRef("");
  const [commentValue, setCommentValue] = useState("");
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
  const [postToEdit, setPostToEdit] = useState(null);
  const [editingPost, setEditingPost] = useState(false);
  const [newCommentValue, setNewCommentValue] = useState("");
  let postID = useParams();

  // console.log(postID);
  postID = postID.postId;
  const selfID = useSelector(state => state.userID.value);
  const navigate = useNavigate()

  const handleEdit = () => {
    setEditingPost(true);
  };
  const handleEditComment = async (index, status) => {
    let new_isEditComments;
    switch (status) {
      case "open":
        let otherCommmentIsEditing = false;
        isEditComments.forEach(element => {
          otherCommmentIsEditing ||= element;
        });
        if (otherCommmentIsEditing) {
          alert("You are editing other comment.");
          break;
        }
        newComment.current = comments[index].comment;

        new_isEditComments = isEditComments.slice(0, index).concat(true).concat(isEditComments.slice(index + 1));
        setIsEditComments(new_isEditComments);
        setNewCommentValue(comments[index].comment);
        break;
      case "cancel":
        new_isEditComments = isEditComments.slice(0, index).concat(false).concat(isEditComments.slice(index + 1));
        setIsEditComments(new_isEditComments);
        setNewCommentValue("");
        break;
      case "confirm":
        if (newComment.current === "") {
          alert("comment cann't be empty");
          break;
        }
        new_isEditComments = isEditComments.slice(0, index).concat(false).concat(isEditComments.slice(index + 1));
        setIsEditComments(new_isEditComments);
        const new_comment = {
          "ownerID": comments[index].ownerID,
          "avatar": comments[index].avatar,
          "comment": newComment.current,
          "createdTime": comments[index].createdTime
        };
        newComment.current = "";
        setNewCommentValue("");
        const new_comments = comments.slice(0, index).concat(new_comment).concat(comments.slice(index + 1));
        setComments(new_comments);
        try {
          await updatePost(postID, "comments", new_comments);
        }
        catch (e) {
          console.log(e)
        }
        break;
      default:
        alert('edit status error')
    }
  };

  const handleDelete = async () => {
    try {
      await deletePost(postID);
    }
    catch (e) {
      console.log(e);
    }
    navigate(-1);
  };

  const handlePost = async () => {
    if (commentValue === "") {
      alert('Please enter a comment.');
      return;
    }

    const newComment = {
      "ownerID": userID,
      "avatar": loggedInUserAvatar,
      "comment": commentValue,
      "createdTime": new Date(Date.now()).toISOString(),
    }
    setComments(comments =>
      [...comments, newComment]
    )
    setIsEditComments([...isEditComments, false])
    try {
      await updatePost(postID, "comments", [...comments, newComment])
    }
    catch (e) {
      console.log(e);
    }
    setCommentValue("");
    // document.getElementById("comment-input").value = "" //TODO: no comment-input?
  }

  const handleDeleteComment = async (index) => {
    const new_isEditComments = isEditComments.slice(0, index).concat(isEditComments.slice(index + 1));
    setIsEditComments(new_isEditComments);
    const new_comments = comments.slice(0, index).concat(comments.slice(index + 1));
    setComments(new_comments);
    try {
      await updatePost(postID, "comments", new_comments);
    }
    catch (e) {
      console.log(e);
    }
  }

  const handleClose = () => {
    navigate(-1);
    // navigate(`/${location.state.from}`)
  }

  const handleLikeClick = async () => {
    // Cancel like.
    let newLikes = likes.filter((x) => x !== selfID);
    setLikes(newLikes);
    try {
      await updatePost(postID, "likes", newLikes);
    }
    catch (e) {
      console.log(e);
    }
  }

  const handleUnlikeClick = async () => {
    let newLikes = [...likes, selfID];
    setLikes(newLikes);
    try {
      await updatePost(postID, "likes", newLikes);
    }
    catch (e) {
      console.log(e);
    }
  }

  const fetchMentionUsers = async (query, callBack) => {
    try {
      const allUsers = await getUsers();
      const transformedAllUsers = allUsers.map(function (u) { return { id: u.id, display: u.username } });
      if (!query) {
        callBack(transformedAllUsers);
      }
      else {
        const filteredUsers = transformedAllUsers.filter((user) => user.display.toLowerCase().includes(query.toLowerCase()));
        callBack(filteredUsers);
      }
    }
    catch (error) {
      console.log(error);
      return;
    }
  }

  useEffect(() => {
    // console.log('in useEffect')
    async function getData() {
      try {
        const post = await getPostByID(postID);
        setPostToEdit(post);
        setText(post.text);
        setPic(post.pic);
        setOwner(post.owner);
        setVideo(post.video);
        setComments(post.comments);
        setIsEditComments(Array.apply(null, Array(post.comments.length)).map(function (x, i) { return false; }))
        setLikes(post.likes);
        setCreatTime(post.createdTime);
        const userInfo = await getUser(post.owner);
        setUsername(userInfo.username);
        setAvatar(userInfo.avatar);

        const loggedInUser = await getUser(userID);
        setLoggedInUserAvatar(loggedInUser.avatar);
      } catch (e) {
        console.log(e);
      }
    }
    getData()

  }, [postID, userID])

  function mapComment(i) {
    // console.log(i);
    if (i.includes("^^^")) {
      return <Link to={`/profile/${i.split("^^^")[0]}`}>@{i.split("^^^__")[1]}</Link>;
    }
    else {
      return i;
    }
  }

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
        {!editingPost ? (
          <>
            <div className="left-part">
              {video ? (
                <video controls>
                  <source src={video} type="video/mp4"></source>
                </video>
              ) : (
                <img src={pic} alt="user-post" />
              )}
            </div>
            <div className="right-part">
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
                          <MentionsInput
                            className="edit-comment-input"
                            value={newCommentValue}
                            forceSuggestionsAboveCursor={true}
                            onChange={(e) => { setNewCommentValue(e.target.value); newComment.current = e.target.value }}

                          >
                            <Mention
                              data={fetchMentionUsers}
                              displayTransform={
                                (id, display) => "@" + (display)
                              }
                              trigger="@"
                              markup="@@@____id__^^^____display__@@@__"
                              appendSpaceOnAdd={true}
                              style={{ backgroundColor: "#cee4e5", fontWeight: "normal" }}
                            />
                          </MentionsInput>
                          {userID === item.ownerID ? (
                            <div className="comment-operators">
                              <div className="time">{item.createdTime}</div>
                              <div className="comment-edit" data-testid={`confirm-${key}`} onClick={() => handleEditComment(key, 'confirm')}>Confirm</div>
                              <div className="comment-edit" onClick={() => handleEditComment(key, 'cancel')}>Cancel</div>
                            </div>
                          ) : (
                            <div className="time">{item.createdTime}</div>
                          )}
                        </div>
                      ) : (
                        <div>
                          <div className="comment-text" id="comment-text-nonInput">
                            {
                              item.comment.split("@@@__").map(
                                (i, k) => (<span key={k}>{mapComment(i)}</span>)
                              )
                            }
                          </div>

                          {userID === item.ownerID ? (
                            <div className="comment-operators">
                              <div className="time">{item.createdTime}</div>
                              <div className="comment-edit" data-testid={`edit-${key}`} onClick={() => handleEditComment(key, 'open')}>Edit</div>
                              <div className="comment-edit" onClick={() => handleDeleteComment(key)}>Delete</div>
                            </div>
                          ) : (
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
                    {likes.includes(selfID) ? (<FavoriteIcon onClick={handleLikeClick} className={"favIcon"} />) : (<FavoriteBorderIcon onClick={handleUnlikeClick} className={"notFavIcon"} />)}
                    <span></span>
                    <ChatBubbleOutlineIcon />
                  </div>
                  <div className="like">{likes.length} likes</div>
                  <div className="time">{createdTime}</div>
                </div>
                <div className="post-comment">
                  <MentionsInput
                    singleLine
                    data-testid="comment-input"
                    id="comment-input"
                    className="comment-input"
                    value={commentValue}
                    onChange={(e) => setCommentValue(e.target.value)}
                    forceSuggestionsAboveCursor={true}
                    placeholder="Mention people using @">
                    <Mention
                      data={fetchMentionUsers}
                      displayTransform={
                        (id, display) => "@" + (display)
                      }
                      trigger="@"
                      markup="@@@____id__^^^____display__@@@__"
                      appendSpaceOnAdd={true}
                      style={{ backgroundColor: "#cee4e5", fontWeight: "normal" }}
                    />
                  </MentionsInput>
                  <Button onClick={handlePost}>Post</Button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <EditPost post={postToEdit} avatar={avatar} username={username} />
        )}
      </div>
    </Modal >

    // </div> 
  )
}


export default PostDetail