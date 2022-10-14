import Gallery from "../components/Gallery";
import Navbar from "../components/navbar";
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';

import ProfileOverview from "../components/ProfileOverview";
function Profile() {
	const userID = useSelector(state => state.userID.value);
	const location = useLocation();
	const currProfile = location.pathname;
	console.log(currProfile);
	return (
		<div>
			<Navbar />
			<ProfileOverview />
			<Gallery />
		</div>
	);
}

export default Profile;