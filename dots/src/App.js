import {
  Link,
} from "react-router-dom";
import Button from '@mui/material/Button';
import PostDetail from './components/postDetail'

function App() {
  const postInfo = {
    text: "It’s finally here! Catch our latest summer collection, “Juniper Valley,” and use code BELLEJUNI to get 10% off your first order. alalalalalalalalallalalala, It’s finally here! Catch our latest summer collection, “Juniper Valley,” and use code BELLEJUNI to get 10% off your first order. alalalalalalalalallalalalaIt’s finally here! Catch our latest summer collection, “Juniper Valley,” and use code BELLEJUNI to get 10% off your first order. alalalalalalalalallalalalaIt’s finally here! Catch our latest summer collection, “Juniper Valley,” and use code BELLEJUNI to get 10% off your first order. alalalalalalalalallalalala",
    // pic: "https://source.unsplash.com/random",
    pic: "/asset/photo.jpg",
    video: "",
    owner: "1",
    comments: [{user: "yuting", comment: "Love your Post!"},{user: "shuyue", comment: "hhhh"}],
    likes: [],
    createdTime: "March 19",
  };
  return (
    <div>
      <h1>in App</h1>
      <Link to='/home'>
        <Button variant="outlined">Home</Button>
      </Link>
      <Link to='/login'>
        <Button variant="outlined">login</Button>
      </Link>
      <Link to='/register'>
        <Button variant="outlined">register</Button>
      </Link>
      <Link to='/profile'>
        <Button variant="outlined">profile</Button>
      </Link>
      <PostDetail postInfo={postInfo} />
    </div>
  );
}

export default App;