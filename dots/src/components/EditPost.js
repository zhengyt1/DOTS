import { Alert, Avatar, Collapse, IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import { Cancel } from "@mui/icons-material";
import TextField from '@mui/material/TextField';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import MovieCreationIcon from '@mui/icons-material/MovieCreation';
import './EditPost.css'

import { useState } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { firebaseStorage } from "../firebase/firebase";
import { updatePost } from "../mockedAPI/mockedAPI";

function EditPost(props) {
    const [text, setText] = useState(props.post.text);
    const [pic, setPic] = useState(props.post.pic);
    const [video, setVideo] = useState(props.post.video);
    const [picChanged, setPicChanged] = useState(false);
    const [videoChanged, setVideoChanged] = useState(false);
    const [openAlert, setOpenAlert] = useState(false);

    const handlePost = async (e) => {
        e.preventDefault();

        await updatePost(props.post.id, "text", text);

        if (picChanged && pic) {
            setPicChanged(false);
            const imageRef = ref(firebaseStorage, `images/${pic.name + Date.now()}`);
            uploadBytes(imageRef, pic).then(async (snapshot) => {
                getDownloadURL(snapshot.ref).then(async (url) => {
                    await updatePost(props.post.id, "pic", url);
                });
            });
        } else if (videoChanged && video) {
            setVideoChanged(false);
            const videoRef = ref(firebaseStorage, `videos/${video.name + Date.now()}`);
            uploadBytes(videoRef, video).then(async (snapshot) => {
                getDownloadURL(snapshot.ref).then(async (url) => {
                    await updatePost(props.post.id, "video", url);
                });
            });
        } 
        
        if (!pic && !video) {
            window.alert("Please share with an Image or Video");
        } else {
            //navigate(-1);
            setOpenAlert(true);
        }
    }

    return (
    <><div className="left-part">
            {video && (
                <div className="shareImgContainer">
                    <video controls>
                        <source src={videoChanged ? URL.createObjectURL(video) : video} type="video/mp4"></source>
                    </video>
                    <Cancel className="shareCancelImg" onClick={() => {setVideo(null); setVideoChanged(true);}} />
                </div>
            )} 
            {pic && (
                <div className="shareImgContainer">
                    <img src={picChanged ? URL.createObjectURL(pic) : pic} alt="user-post" />
                    <Cancel className="shareCancelImg" onClick={() => {setPic(null); setPicChanged(true);}} />
                </div>
            )}
        </div><div className="right-part">
                <div className="middle-part">
                    <div>
                        <div className="user-info">
                            <Avatar src={props.avatar} />
                            <div className="username">{props.username}</div>
                            <span></span>
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
                        action={
                            <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={() => {
                                setOpenAlert(false)
                            }}
                            >
                            <CloseIcon fontSize="inherit" />
                            </IconButton>
                        }
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
                            style={{ display: "none" }}
                            type="file"
                            id="file"
                            accept=".png,.jpeg,.jpg"
                            onChange={(e) => setPic(e.target.files[0])}
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
                        <Button onClick={handlePost}>Post</Button>
                    </div>
                </div>
            </div></>
    )
}

export default EditPost;
