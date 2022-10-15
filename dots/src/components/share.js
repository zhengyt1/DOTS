import React from "react";
import "./share.css";
import { Cancel } from "@mui/icons-material";
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import MovieCreationIcon from '@mui/icons-material/MovieCreation';
import { useRef, useState } from "react";
import { Switch } from "@mui/material";
import TextField from '@mui/material/TextField';
import { createPost } from "../mockedAPI/mockedAPI";
import { useSelector } from "react-redux";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { firebaseStorage } from "../firebase/firebase";

function Share(props) {


    const shareTextRef = useRef();
    const tagUsersRef = useRef();
    const [shareFile, setFile] = useState(null);
    const [shareVideo, setVideo] = useState(null);
    const [showTagArea, setShowTagArea] = React.useState(false);
    const [isPrivate, setPrivate] = React.useState(false);
    const userID = useSelector(state => state.userID.value);

    const submitHandler = async (e) => {
        e.preventDefault();

        const newPost = {
          text: shareTextRef.current.value,
          pic: "",
          video: "",
          owner: userID,
          comments: [],
          likes: [],
          isPrivate: isPrivate,
          createdTime: Date.now(),
          mentions: tagUsersRef.current.value.split(", ")
        };

        if (shareFile) {
          const imageRef = ref(firebaseStorage, `images/${shareFile.name + Date.now()}`);
          uploadBytes(imageRef, shareFile).then(async (snapshot) => {
            getDownloadURL(snapshot.ref).then(async (url) => {
              // add url to newPost
              newPost.pic = url;
              await createPost(newPost);
              window.location.reload();
            });
          });
        } else if (shareVideo) {
          const videoRef = ref(firebaseStorage, `videos/${shareVideo.name + Date.now()}`);
          uploadBytes(videoRef, shareVideo).then(async (snapshot) => {
            getDownloadURL(snapshot.ref).then(async (url) => {
              // add url to newPost
              newPost.video = url;
              await createPost(newPost);
              window.location.reload();
            });
          });
        } else {
          await createPost(newPost);
          window.location.reload();
        }
    };

    const TagInputAreaHandler = () => {
        if (showTagArea === true) {
            setShowTagArea(false);
        } else {
            setShowTagArea(true);
        }
    };

    const privacyHandler = (event) => {
        setPrivate(event.target.checked);
    };

    return (
        <div className="share">
        <div className="shareWrapper">
          <div className="shareTop">
            <img
              className="shareProfileImg"
              src={
                props.user.avatar
              }
              alt=""
            />
            <TextField
              id="outlined-textarea"
              placeholder={"What's in your mind, " + props.user.username + "?"}
              className="shareInput"
              inputRef={shareTextRef}
              multiline
              rows={2}
              fullWidth
            />
          </div>

          {showTagArea && (
            <div className="shareTags">
              <hr className="shareHr" />
              <input
                  placeholder={"Tag other users, input usernames separated by comma: "}
                  className="shareInput"
                  ref={tagUsersRef}
              />
            </div>
          )}
          
          <hr className="shareHr" />
          {shareFile && (
            <div className="shareImgContainer">
              <img className="shareImg" src={URL.createObjectURL(shareFile)} alt="" />
              <Cancel className="shareCancelImg" onClick={() => setFile(null)} />
            </div>
          )}
          {shareVideo && (
            <div className="shareVideoContainer">
              <video className="shareVideo" alt="" controls>
                <source src={URL.createObjectURL(shareVideo)} type="video/mp4" />
                <source src={URL.createObjectURL(shareVideo)} type="video/ogg" />
                <source src={URL.createObjectURL(shareVideo)} type="video/webm" />
              </video>
              <Cancel className="shareCancelImg" onClick={() => setVideo(null)} />
            </div>
          )}
          <form className="shareBottom" onSubmit={submitHandler}>
            <div className="shareOptions">
              <label htmlFor="file" className="shareOption">
                <AddPhotoAlternateIcon htmlColor="#ff1744" className="shareIcon" />
                <span className="shareOptionText">Photo</span>
                <input
                  style={{ display: "none" }}
                  type="file"
                  id="file"
                  accept=".png,.jpeg,.jpg"
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </label>
              <label htmlFor="video" className="shareOption">
                <MovieCreationIcon htmlColor="#ff1744" className="shareIcon" />
                <span className="shareOptionText">Video</span>
                <input
                  style={{ display: "none" }}
                  type="file"
                  id="video"
                  accept=".mp4,.ogg,.webm"
                  onChange={(e) => setVideo(e.target.files[0])}
                />
              </label>
              <div className="shareOption" onClick={TagInputAreaHandler} >
                <AlternateEmailIcon htmlColor="#2196f3" className="shareIcon"/>
                <span className="shareOptionText">Tag</span>
              </div>
              <div className="shareOption" >
                <Switch className="shareIcon" onChange={privacyHandler}/>
                <span className="shareOptionText">Private Post</span>
              </div>
            </div>
            <button className="shareButton" type="submit">
              Share
            </button>
          </form>
        </div>
      </div>
    );
}

export default Share;