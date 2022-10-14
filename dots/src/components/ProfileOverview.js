import { ExpandMore } from "@mui/icons-material";
import { Avatar, Button, IconButton } from "@mui/material";
import React from "react";

function ProfileOverview(props) {
    const selfID = "1"
    const profileID = "2"
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
                        {
                            selfID === profileID ?
                                (<Button variant="contained" size="small">Follow</Button>)
                                : (<Button variant="outlined" size="small">Unfollow</Button>)}
                        < IconButton >
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
                </div>

            </div>


        </div >
    )
}

export default ProfileOverview;