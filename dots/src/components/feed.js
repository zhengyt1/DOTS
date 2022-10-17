import Post from "./post";
import React from "react";
import { Box } from "@mui/system";
import { List, ListItem } from "@mui/material";


function Feed(props) {
    return (
        <Box className="feed" 
            flex={6}>
            <List className="feedList">
                {props.posts?.map((item, key)=>(    
                    <ListItem key={key}>
                        <Post postInfo={item} />
                    </ListItem>
                ))}
            </List>
        </Box>
    );
}

export default Feed;