import { Stack } from "@mui/material";
import Navbar from "../components/navbar";
import Rightbar from "../components/rightbar";
import Feed from "../components/feed";
import './home.css';
import Share from "../components/share";
import { getUser, getPosts, getFeed, getPostsByUserID } from "../mockedAPI/mockedAPI";
import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";

function Home() {
  const userID = useSelector(state => state.userID.value);
  console.log(userID);
  const suggestedUser = {
    avatar: "/asset/photo.jpg",
    username: "Yuting",
  }
  const suggestedUsers = [suggestedUser, suggestedUser, suggestedUser]

  const currentUser = {
    avatar: "/asset/photo.jpg",
    username: "Joe Doe",
  }

  const [posts, setPosts] = useState([]);
  const loadFeed = useRef(false);

  useEffect(() => {

    async function fetchFeed() {
      const data = await getFeed(userID);
      setPosts(data);
    }
    if (loadFeed.current === false) {
      console.log("loadFeed");
      fetchFeed();
      loadFeed.current = true;
    }
  });

	return (
		<div>
      <Navbar userID={userID} ></Navbar>
			<Stack direction="row" spacing={2} justifyContent="space-between">
        <Stack direction="column" spacing={2} justifyContent="space-between" flex={6}>
          <Share user={currentUser} ></Share>
          <Feed posts={posts} />
        </Stack>
        <Rightbar suggestedUsers={suggestedUsers} />
      </Stack>
      
		</div>
	);
}
  
export default Home;
