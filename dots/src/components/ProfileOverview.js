import { Camera, ExpandMore, FolderSpecial, InsertPhoto } from "@mui/icons-material";
import { Avatar, Button, ButtonGroup, IconButton } from "@mui/material";
import React from "react";

function ProfileOverview(props) {
    const name = "Remy Sharp";
    const numOfPosts = 4;
    const numOfFollowers = 4;
    const numOfFollowings = 4;


    return (
        <div>
            <div style={{
                display: "flex",
                alignItems: 'center',
                justifyContent: 'center',
                borderBottom: "1px solid grey"
            }}>
                <div style={{ margin: 10 }}>
                    <Avatar
                        alt={name}
                        src=""
                        sx={{ width: 100, height: 100 }}
                    />
                </div>
                <div style={{ marginLeft: 60 }}>
                    <div style={{
                        display: "flex",
                        justifyContent: 'space-between'

                    }}>
                        <div style={{ marginRight: 30, height: 40, lineHeight: "40px", display: "inline-block", verticalAlign: "middle" }}>
                            <h2>{name}</h2>
                        </div>
                        <Button variant="contained" size="small">Follow</Button>
                        <IconButton>
                            <ExpandMore />
                        </IconButton>
                    </div>
                    <div style={{
                        display: "flex",
                        justifyContent: "space-between",
                        margin: "10px 0px"
                    }}>
                        <h5>{numOfPosts} posts</h5>
                        <h5>{numOfFollowers} follows</h5>
                        <h5>{numOfFollowings} followers</h5>
                    </div>
                    <div>
                        <h5>real name</h5>
                        <h5>About me: sssssss</h5>
                    </div>
                </div>

            </div>
            <div style={{
                display: "flex",
                justifyContent: 'center'

            }}>
                <div style={{
                    borderTop: "1px solid black",
                    margin: "0px 10px"
                }}>
                    <Button endIcon={<Camera />}>Posts</Button>
                </div>
                <div style={{
                    borderTop: "1px solid black",
                    margin: "0px 10px"
                }}>
                    <Button endIcon={<FolderSpecial />}>Saved</Button>
                </div>

            </div>

        </div >
    )
}

export default ProfileOverview;