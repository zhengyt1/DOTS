import React from "react";
import "./share.css";
import { Cancel } from "@mui/icons-material";
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import { useContext, useRef, useState } from "react";
import { Switch } from "@mui/material";


function Share(props) {


    const shareTextRef = useRef();
    const tagUsersRef = useRef();
    const [shareFile, setFile] = useState(null);
    const [showTagArea, setShowTagArea] = React.useState(false);
    const [isPrivate, setPrivate] = React.useState(false);

    const submitHandler = async (e) => {
        e.preventDefault();
        // console.log(shareTextRef.current.value);
        // console.log(tagUsersRef.current.value);
        // console.log(isPrivate);
    };

    const TagInputAreaHandler = () => {
        if (showTagArea === true) {
            setShowTagArea(false);
        } else {
            setShowTagArea(true);
        }
    };

    const TagInputArea = () => (
        <div className="shareTags">
            <hr className="shareHr" />
            <input
                placeholder={"Tag other users, input usernames separated by comma: "}
                className="shareInput"
                ref={tagUsersRef}
            />
        </div>
    );

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
            <input
              placeholder={"What's in your mind " + props.user.username + "?"}
              className="shareInput"
              ref={shareTextRef}
            />
          </div>

          {showTagArea ? <TagInputArea /> : null}
          
          <hr className="shareHr" />
          {shareFile && (
            <div className="shareImgContainer">
              <img className="shareImg" src={URL.createObjectURL(shareFile)} alt="" />
              <Cancel className="shareCancelImg" onClick={() => setFile(null)} />
            </div>
          )}
          <form className="shareBottom" onSubmit={submitHandler}>
            <div className="shareOptions">
              <label htmlFor="file" className="shareOption">
                <AddPhotoAlternateIcon htmlColor="#ff1744" className="shareIcon" />
                <span className="shareOptionText">Photo or Video</span>
                <input
                  style={{ display: "none" }}
                  type="file"
                  id="file"
                  accept=".png,.jpeg,.jpg"
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </label>
              <div className="shareOption" >
                <AlternateEmailIcon htmlColor="#2196f3" className="shareIcon" onClick={TagInputAreaHandler}/>
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