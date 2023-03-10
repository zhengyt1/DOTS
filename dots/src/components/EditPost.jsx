/* eslint-disable jsx-a11y/media-has-caption */
import { React, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';
import {
  Alert,
  Avatar,
  Collapse,
  IconButton,
  Switch,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import { Cancel } from '@mui/icons-material';
import TextField from '@mui/material/TextField';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import MovieCreationIcon from '@mui/icons-material/MovieCreation';
import './EditPost.css';

import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import PropTypes from 'prop-types';
import firebaseStorage from '../firebase/firebase';
import { updatePost } from '../mockedAPI/mockedAPI';

function EditPost(props) {
  const navigate = useNavigate();

  const [messageApi, contextHolder] = message.useMessage();
  const { post, username, avatar } = props;
  const [text, setText] = useState(post.text);
  const [pic, setPic] = useState(post.pic);
  const [video, setVideo] = useState(post.video);
  const [isPrivate, setPrivate] = useState(post.isPrivate);
  const [picChanged, setPicChanged] = useState(false);
  const [videoChanged, setVideoChanged] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);

  const handlePost = async (e) => {
    e.preventDefault();
    try {
      await updatePost(post._id, 'text', text);
      await updatePost(post._id, 'isPrivate', isPrivate);

      if (picChanged && pic) {
        const imageRef = ref(firebaseStorage, `images/${pic.name + Date.now()}`);
        uploadBytes(imageRef, pic).then(async (snapshot) => {
          getDownloadURL(snapshot.ref).then(async (url) => {
            await updatePost(post._id, 'pic', url);
          });
        });
      } else if (videoChanged && video) {
        const videoRef = ref(firebaseStorage, `videos/${video.name + Date.now()}`);
        uploadBytes(videoRef, video).then(async (snapshot) => {
          getDownloadURL(snapshot.ref).then(async (url) => {
            await updatePost(post._id, 'video', url);
          });
        });
      }
      if (!pic && !video) {
        messageApi.info('Please share with an Image or Video');
      } else {
        setOpenAlert(true);
      }
    } catch (err) {
      messageApi.error(e.message);
      setTimeout(() => { navigate('/'); }, 1000);
    }
  };

  const handlePicChange = (e) => {
    setPicChanged(true);
    if (e.target.files.length) {
      setPic(e.target.files[0]);
    }
  };

  const handleVideoChange = (e) => {
    setVideoChanged(true);
    if (e.target.files.length) {
      setVideo(e.target.files[0]);
    }
  };

  const privacyHandler = (event) => {
    setPrivate(event.target.checked);
  };

  return (
    <>
      <div className="left-part">
        {contextHolder}
        {video && (
        <div className="shareImgContainer">
          <video controls>
            <source src={videoChanged ? URL.createObjectURL(video) : video} type="video/mp4" />
          </video>
          <Cancel className="shareCancelImg" onClick={() => { setVideo(null); setVideoChanged(true); }} />
        </div>
        )}
        {pic && (
        <div className="shareImgContainer">
          <img src={picChanged ? URL.createObjectURL(pic) : pic} alt="user-post" />
          <Cancel className="shareCancelImg" onClick={() => { setPic(null); setPicChanged(true); }} />
        </div>
        )}
      </div>
      <div className="right-part">
        <div className="middle-part">
          <div>
            <div className="user-info">
              <Avatar src={avatar} />
              <div className="username">{username}</div>
              <span />
            </div>
            <TextField
              id="outlined-textarea"
              className="shareInput"
              value={text}
              onChange={(newValue) => setText(newValue.target.value)}
              multiline
              rows={2}
              fullWidth
            />
          </div>
        </div>
        <div className="bottom">
          <hr />
          <Collapse in={openAlert}>
            <Alert
              action={(
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setOpenAlert(false);
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              )}
              sx={{ mb: 2 }}
            >
              Post updated!
            </Alert>
          </Collapse>
          <div className="post-comment">
            <label htmlFor="file" className="shareOption">
              <AddPhotoAlternateIcon htmlColor="#ff1744" className="shareIcon" />
              <span className="shareOptionText">Photo</span>
              <input
                style={{ display: 'none' }}
                type="file"
                id="file"
                accept=".png,.jpeg,.jpg"
                onChange={(e) => handlePicChange(e)}
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
                onChange={(e) => handleVideoChange(e)}
              />
            </label>
            <div className="shareOption">
              <Switch className="shareIcon" checked={isPrivate} onChange={privacyHandler} />
              <span className="shareOptionText">Private Post</span>
            </div>
            <Button onClick={handlePost}>Post</Button>
          </div>
        </div>
      </div>
    </>
  );
}

const postShape = {
  _id: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  pic: PropTypes.string.isRequired,
  video: PropTypes.string.isRequired,
  owner: PropTypes.string.isRequired,
  comments: PropTypes.array.isRequired,
  likes: PropTypes.array.isRequired,
};

EditPost.propTypes = {
  post: PropTypes.shape(postShape).isRequired,
  username: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
};

export default EditPost;
