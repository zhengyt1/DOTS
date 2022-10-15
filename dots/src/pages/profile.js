import Gallery from "../components/Gallery";
import Navbar from "../components/navbar";
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import ProfileOverview from "../components/ProfileOverview";

import React, { useEffect, useRef, useState } from "react";
import { getUser, getPostsByUserID } from '../mockedAPI/mockedAPI';

function Profile(props) {
	const selfID = useSelector(state => state.userID.value);
	const location = useLocation();
	const profileID = location.pathname.split("/")[2];
	console.log(profileID, selfID);

	const [username, SetUsername] = useState("");
	const [userAvatar, SetAvatar] = useState("");
	const [description, SetDescription] = useState("");
	const [followers, SetFollowers] = useState([]);
	const [followings, SetFollowings] = useState([]);
	const [posts, SetPosts] = useState([]);
	const loadData = useRef(true);
	useEffect(() => {
		// get the list of students from the backend
		async function fetchData() {
			const userData = await getUser(profileID);
			if (userData !== undefined) {
				SetUsername(userData.username);
				SetAvatar(userData.avatar);
				SetDescription(userData.description);
				SetFollowers(userData.followers);
				SetFollowings(userData.followings);
				console.log(userData);
			}
			const postsData = await getPostsByUserID(profileID);
			if (postsData !== undefined) {
				SetPosts(postsData);
			}
		}

		if (loadData.current === true) {
			loadData.current = false;
			fetchData();
		}

	}, [])


	return (
		<div>
			<Navbar />
			<ProfileOverview
				selfID={selfID}
				profileID={profileID}
				username={username}
				userAvatar={userAvatar}
				description={description}
				numOfFollowers={followers.length}
				numOfFollowings={followings.length}
				numOfPosts={posts.length} />
			<Gallery posts={posts} saved={[]} />
		</div>
	);
}

export default Profile;