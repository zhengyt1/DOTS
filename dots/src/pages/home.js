import Navbar from "../components/navbar";
import Post from "../components/post"
import './home.css'

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
	return (
		<div>
      <Navbar />
			<div>Home</div>
      <ul>
        {posts.map((item, key)=>(
          <li key={key}>
            <Post postInfo={item} />
          </li>
        ))}
      </ul>
		</div>
	);
}
  
export default Home;
