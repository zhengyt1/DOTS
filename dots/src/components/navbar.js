import {
  Link,
} from "react-router-dom";
import './navbar.css';
import { userLogout,  } from '../reducers';
import { useDispatch, useSelector } from "react-redux";

function Navbar() {
	const userID = useSelector(state => state.userID.value);
	const dispatch = useDispatch()
	return (
		<div className='nav-container'>
			<div className='font'>
				DOTS
			</div>
			<div className='icon-container'>
				<Link to='/home'>
					<img  className='icon' src="/asset/icon-home.png" alt="home"></img>
				</Link>
				<Link to={`/profile/${userID}`} key={`/profile/${userID}`}>
					<img  className='icon' src="/asset/icon-profile.png" alt="profile"></img>
				</Link>
				<Link to='/' onClick={dispatch(userLogout)}>
					<div className="logout" >
						Log Out
					</div>
				</Link>
			</div>
		</div>
	);
}
  
export default Navbar;