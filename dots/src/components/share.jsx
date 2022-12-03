/* eslint-disable jsx-a11y/media-has-caption */
import React, { useRef, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { message } from 'antd';
import './share.css';
import { Cancel } from '@mui/icons-material';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
// import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import MovieCreationIcon from '@mui/icons-material/MovieCreation';
import { Switch } from '@mui/material';
import TextField from '@mui/material/TextField';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { createPost, getUser } from '../mockedAPI/mockedAPI';
import firebaseStorage from '../firebase/firebase';

function Share() {
  const [messageApi, contextHolder] = message.useMessage();
  const shareTextRef = useRef();
  const tagUsersRef = useRef();
  const [shareImage, setImage] = useState(null);
  const [shareVideo, setVideo] = useState(null);
  const [showTagArea, setShowTagArea] = React.useState(false);
  const [isPrivate, setPrivate] = React.useState(false);
  const userID = useSelector((state) => state.userID.value);

  const [username, setUsername] = useState('');
  const [avatar, setAvatar] = useState('');
  const loadData = useRef(true);
  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getUser(userID);
        if (data !== undefined) {
          setUsername(data.username);
          setAvatar(data.avatar);
        }
      } catch (e) {
        throw new Error(e);
      }
    }
    // only load data on the first rendering
    if (loadData.current === true) {
      loadData.current = false;
      fetchData();
    }
  });

  const submitHandler = async (e) => {
    e.preventDefault();

    const newPost = {
      text: shareTextRef.current.value,
      pic: '',
      video: '',
      owner: userID,
      comments: [],
      likes: [],
      isPrivate,
      createdTime: new Date(Date.now()).toISOString(),
    };

    if (shareImage) {
      const imageRef = ref(firebaseStorage, `images/${shareImage.name + Date.now()}`);
      uploadBytes(imageRef, shareImage).then(async (snapshot) => {
        getDownloadURL(snapshot.ref).then(async (url) => {
          // add url to newPost
          newPost.pic = url;
          await createPost(newPost);
        });
      });
    } else if (shareVideo) {
      const videoRef = ref(firebaseStorage, `videos/${shareVideo.name + Date.now()}`);
      uploadBytes(videoRef, shareVideo).then(async (snapshot) => {
        getDownloadURL(snapshot.ref).then(async (url) => {
          // add url to newPost
          newPost.video = url;
          await createPost(newPost);
        });
      });
    } else {
      messageApi.info('Please share with an Image or Video');
    }
    if (shareTextRef.current !== undefined && shareTextRef.current !== null) {
      shareTextRef.current.value = '';
    }
    if (tagUsersRef.current !== undefined && tagUsersRef.current !== null) {
      tagUsersRef.current.value = '';
    }
    setImage(null);
    setVideo(null);
    setPrivate(false);
    setShowTagArea(false);
  };

  // const TagInputAreaHandler = () => {
  //   if (showTagArea === true) {
  //     setShowTagArea(false);
  //   } else {
  //     setShowTagArea(true);
  //   }
  // };

  const privacyHandler = (event) => {
    setPrivate(event.target.checked);
  };

  return (
    <div className="share">
      {contextHolder}
      <div className="shareWrapper">
        <div className="shareTop">
          <img
            className="shareProfileImg"
            src={
                avatar
              }
            alt=""
          />
          <TextField
            id="outlined-textarea"
            placeholder={`What's in your mind, ${username}?`}
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
            placeholder="Tag other users, input usernames separated by comma: "
            className="shareInput"
            ref={tagUsersRef}
          />
        </div>
        )}

        <hr className="shareHr" />
        {shareImage && (
        <div className="shareImgContainer">
          <img className="shareImg" src={URL.createObjectURL(shareImage)} alt="" />
          <Cancel className="shareCancelImg" onClick={() => setImage(null)} />
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
                style={{ display: 'none' }}
                type="file"
                id="file"
                accept=".png,.jpeg,.jpg"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </label>
            <label htmlFor="video" className="shareOption">
              <MovieCreationIcon htmlColor="#ff1744" className="shareIcon" />
              <span className="shareOptionText">Video</span>
              <input
                style={{ display: 'none' }}
                type="file"
                id="video"
                accept=".mp4,.ogg,.webm"
                onChange={(e) => setVideo(e.target.files[0])}
              />
            </label>
            {/* <div className="shareOption" onClick={TagInputAreaHandler}>
              <AlternateEmailIcon htmlColor="#2196f3" className="shareIcon" />
              <span className="shareOptionText">Tag</span>
            </div> */}
            <div className="shareOption">
              <Switch className="shareIcon" onChange={privacyHandler} />
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