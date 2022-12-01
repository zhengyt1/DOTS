import React from 'react';
import { Box } from '@mui/system';
import { List, ListItem } from '@mui/material';
import PropTypes from 'prop-types';
import Post from './post';

function Feed(props) {
  const { posts } = props;
  return (
    <Box
      className="feed"
      flex={6}
    >
      <List className="feedList">
        {posts?.map((item) => (
          <ListItem key={item._id}>
            <Post postInfo={item} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

Feed.propTypes = {
  posts: PropTypes.arrayOf(Object).isRequired,
};

export default Feed;
