import { Stack } from "@mui/material";
import Navbar from "../components/navbar";
import Rightbar from "../components/rightbar";
import Feed from "../components/feed";
import './home.css';
import Share from "../components/share";

function Home() {
  const postInfo = {
      text: "It’s finally here! Catch our latest summer collection, “Juniper Valley,” and use code BELLEJUNI to get 10% off your first order. alalalalalalalalallalalala, It’s finally here! Catch our latest summer collection, “Juniper Valley,” and use code BELLEJUNI to get 10% off your first order. alalalalalalalalallalalalaIt’s finally here! Catch our latest summer collection, “Juniper Valley,” and use code BELLEJUNI to get 10% off your first order. alalalalalalalalallalalalaIt’s finally here! Catch our latest summer collection, “Juniper Valley,” and use code BELLEJUNI to get 10% off your first order. alalalalalalalalallalalala",
      // pic: "https://source.unsplash.com/random",
      pic: "/asset/photo.jpg",
      video: "",
      owner: "1",
      comments: [{user: "yuting", comment: "Love your Post!"},{user: "shuyue", comment: "hhhh"}],
      likes: [],
      createdTime: "",
  }
  const posts = [postInfo, postInfo, postInfo]

  const suggestedUser = {
    avatar: "/asset/photo.jpg",
    username: "Yuting",
  }
  const suggestedUsers = [suggestedUser, suggestedUser, suggestedUser]

  const currentUser = {
    avatar: "/asset/photo.jpg",
    username: "Joe Doe",
  }


	return (
		<div>
      <Navbar />
			<Stack direction="row" spacing={2} justifyContent="space-between">
        <Stack direction="column" spacing={2} justifyContent="space-between" flex={6}>
          <Share user={currentUser} />
          <Feed posts={posts} />
        </Stack>
        <Rightbar suggestedUsers={suggestedUsers} />
      </Stack>
      
		</div>
	);
}
  
export default Home;
