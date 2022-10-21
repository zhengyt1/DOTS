import { ExpandMore } from "@mui/icons-material";
import { Avatar, Button, IconButton } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { getFollowings, updateUser, getFollowers } from '../mockedAPI/mockedAPI';

function ProfileOverview(props) {
    const selfID = props.selfID
    const profileID = props.profileID
    const [isFollowing, SetIsFollowing] = useState(false);
    const [selfFollowingList, SetSelfFollowingList] = useState([]);
    const [profileFollowerList, SetProfileFollowerList] = useState([]);
    useEffect(() => {
        console.log("entern use effect of profile id", profileID)
        console.log("out of get: followerList of", profileID, "is", profileFollowerList);

        async function fetchData() {
            const followingList = await getFollowings(selfID);
            if (followingList !== undefined) {
                SetSelfFollowingList(followingList);
                if (followingList.includes(profileID)) {
                    SetIsFollowing(true);
                }
                console.log("followingList of", selfID, "is", selfFollowingList);
            }
            const followersList = await getFollowers(profileID);
            if (followersList !== undefined) {

                SetProfileFollowerList(followersList);
                console.log("followerList of", profileID, "is", profileFollowerList);
            }


        }
        fetchData();
    }, [profileID])
    async function handleUnfollowClick() {
        // We can change this logic to backend and add a new api: FollowerUser
        SetIsFollowing(false);

        const newFollowingList = selfFollowingList.filter((
            value, index, l
        ) => {
            return value !== profileID;
        });

        const newFollowerList = profileFollowerList.filter((
            value, index, l
        ) => {
            return value !== selfID;
        });

        SetSelfFollowingList(newFollowingList);
        SetProfileFollowerList(newFollowerList);

        await updateUser(selfID,
            "followings",
            newFollowingList
        )

        await updateUser(profileID,
            "followers",
            newFollowerList
        )
    }

    async function handleFollowClick() {
        // We can change this logic to backend and add a new api: UnFollowerUser
        SetIsFollowing(true);

        const newFollowingList = [...selfFollowingList, profileID,];
        const newFollowerList = [...profileFollowerList, selfID,]

        SetSelfFollowingList(newFollowingList);
        SetProfileFollowerList(newFollowerList);

        await updateUser(selfID,
            "followings",
            newFollowingList)

        await updateUser(profileID,
            "followers",
            newFollowerList)
    }

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
                        alt={props.username}
                        src={props.userAvatar}
                        sx={{ width: 100, height: 100 }}
                    />
                </div>
                <div style={{ marginLeft: 60 }}>
                    <div style={{
                        display: "flex",
                        justifyContent: 'space-between'

                    }}>
                        <div style={{ marginRight: 30, height: 40, lineHeight: "40px", display: "inline-block", verticalAlign: "middle" }}>
                            <h2>{props.username}</h2>
                        </div>
                        {
                            selfID !== profileID ?
                                (
                                    isFollowing ?
                                        (<Button variant="outlined" size="small" onClick={handleUnfollowClick} sx={{ width: "100px" }}>Unfollow</Button>) :
                                        (<Button variant="contained" size="small" onClick={handleFollowClick} sx={{ width: "100px" }} > Follow</Button>)
                                )
                                : (<Button variant="outlined" size="small">Settings</Button>)}
                        < IconButton >
                            <ExpandMore />
                        </IconButton>


                    </div>
                    <div style={{
                        display: "flex",
                        justifyContent: "space-between",
                        margin: "10px 0px"
                    }}>
                        <h5>{props.numOfPosts} posts</h5>
                        <h5>{props.numOfFollowings} followings</h5>
                        <h5>{profileFollowerList.length} followers</h5>
                    </div>
                    <div>
                        <h5>About me: {props.description}</h5>
                    </div>
                </div>

            </div>


        </div >
    )
}

export default ProfileOverview;