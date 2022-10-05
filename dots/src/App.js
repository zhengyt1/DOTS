import {
  Link,
} from "react-router-dom";
import Button from '@mui/material/Button';

function App() {
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
    </div>
  );
}

export default App;