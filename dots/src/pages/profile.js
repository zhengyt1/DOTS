import Gallery from "../components/Gallery";
import Navbar from "../components/navbar";
import ProfileOverview from "../components/ProfileOverview";
function Profile() {
	return (
		<div>
			<Navbar />
			<ProfileOverview />
			<Gallery />
		</div>
	);
}

export default Profile;