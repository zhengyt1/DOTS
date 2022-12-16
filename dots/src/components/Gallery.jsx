/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Button, ImageList } from '@mui/material';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Gallery.css';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ModeCommentIcon from '@mui/icons-material/ModeComment';
import { Camera, FolderSpecial } from '@mui/icons-material';
import { Link } from 'react-router-dom';

function Gallery(props) {
  const { posts, saved } = props;
  const [galleryNav, SetGalleryNav] = useState('posts'); // posts and sved
  const handlePostsNavClick = () => {
    if (galleryNav !== 'posts') { SetGalleryNav('posts'); }
  };
  const handleSavedNavClick = () => {
    if (galleryNav !== 'saved') { SetGalleryNav('saved'); }
  };

  /* Justify whether to show posts or saved */
  let toShow;
  if (galleryNav === 'posts') {
    toShow = posts;
  } else if (galleryNav === 'saved') {
    toShow = saved;
  }

  return (
    <div>
      <div style={{
        display: 'flex',
        justifyContent: 'center',
      }}
      >
        <div
          style={{
            borderTop: galleryNav !== 'posts' ? '' : '1px solid black',
            margin: '0px 10px',
          }}
          onClick={handlePostsNavClick}
        >
          <Button endIcon={<Camera />}>Posts</Button>
        </div>

        <div
          style={{
            borderTop: galleryNav !== 'saved' ? '' : '1px solid black',
            margin: '0px 10px',
          }}
          onClick={handleSavedNavClick}
        >
          <Button endIcon={<FolderSpecial />}>Saved</Button>
        </div>

      </div>

      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      >
        <ImageList sx={{ width: 816 }} cols={3}>
          {toShow.map((item) => (
            <Link to={`/post/${item._id}`} key={item._id}>

              <div key={item._id}>
                <div className="middle">
                  <div className="postThumbNail-text">
                    <FavoriteIcon />
                    {' '}
                    {item.likes.length}
                    <ModeCommentIcon />
                    {' '}
                    {item.comments.length}
                  </div>
                </div>
                <img
                 // If this is a post with no picture, we generate random picture as its thumbnail
                  src={item.pic ? (item.pic) : 'https://source.unsplash.com/random'}
                  loading="lazy"
                  alt={item.text}
                  style={{
                    width: '260px',
                    height: '260px',
                  }}
                  className="postThumbNail-image"
                />

              </div>
            </Link>
          ))}
        </ImageList>
      </div>
    </div>

  );
}

Gallery.propTypes = {
  posts: PropTypes.arrayOf(Object).isRequired,
  saved: PropTypes.arrayOf(Object).isRequired,
};

export default Gallery;
