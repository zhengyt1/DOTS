import { Button, ImageList, ImageListItem } from "@mui/material";
import { Stack } from "@mui/system";
import React, { useState } from "react";
import './Gallery.css'
import FavoriteIcon from '@mui/icons-material/Favorite';
import ModeCommentIcon from '@mui/icons-material/ModeComment';
import { Camera, FolderSpecial } from "@mui/icons-material";
const Gallery = (props) => {
    const [galleryNav, SetGalleryNav] = useState("posts") // posts and sved
    const numOfLikes = 2;
    const numOfComments = 2;
    const handlePostsNavClick = () => {
        if (galleryNav !== "posts") { SetGalleryNav("posts") }
    }
    const handleSavedNavClick = () => {
        if (galleryNav !== "saved") { SetGalleryNav("saved") }
    }
    const itemData = Array(12).fill({
        img: 'https://source.unsplash.com/random'
    });
    return (
        <div>
            <div style={{
                display: "flex",
                justifyContent: 'center'
            }}>
                <div style={{
                    borderTop: galleryNav !== "posts" ? "" : "1px solid black",
                    margin: "0px 10px"
                }}
                    onClick={handlePostsNavClick}>
                    <Button endIcon={<Camera />} >Posts</Button>
                </div>

                <div style={{
                    borderTop: galleryNav !== "saved" ? "" : "1px solid black",
                    margin: "0px 10px"
                }}
                    onClick={handleSavedNavClick}>
                    <Button endIcon={<FolderSpecial />}>Saved</Button>
                </div>


            </div>

            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <ImageList sx={{ width: 816 }} cols={3}>
                    {itemData.map((item) => (
                        <div key={item.img}>
                            <div className="middle">
                                <div className="postThumbNail-text">
                                    <FavoriteIcon /> {numOfLikes}
                                    <ModeCommentIcon /> {numOfComments}
                                </div>
                            </div>
                            <img
                                src={`${item.img}?w=260&h=260&fit=crop&auto=format`}
                                srcSet={`${item.img}?w=260&h=260&fit=crop&auto=format&dpr=2 2x`}
                                alt="post"
                                loading="lazy"
                                style={{
                                    width: "260px",
                                    height: "260px"
                                }}
                                className="postThumbNail-image"
                            />

                        </div>
                        // <ImageListItem >

                        // </ImageListItem>
                    ))}
                </ImageList>

            </div >
        </div>

    )
}



export default Gallery;