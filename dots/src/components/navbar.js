import {
  Link,
} from "react-router-dom";
import './navbar.css'

function Navbar() {
	return (
		<div className='nav-container'>
			<div className='font'>
				DOTS
			</div>
			<div className='icon-container'>
				<Link to='/home'>
					<img  className='icon' src="/asset/icon-home.png" alt="home"></img>
				</Link>
				<Link to='/home'>
					<img  className='icon' src="/asset/icon-post.png" alt="post"></img>
				</Link>
				<Link to='/profile'>
					<img  className='icon' src="/asset/icon-profile.png" alt="profile"></img>
				</Link>
				<Link to='/login'>
					<div className="logout">
						Log Out
					</div>
				</Link>
			</div>
		</div>
	);
}
  
export default Navbar;