import React, { useEffect, useState } from 'react';
import {
  Link,
  useNavigate,
} from 'react-router-dom';
import './navbar.css';
import { message } from 'antd';
// import { useSelector } from 'react-redux';
// import { userLogout } from '../reducers';
import { getUser, reAuthenticate } from '../mockedAPI/mockedAPI';

function Navbar() {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();

  // const userID = useSelector((state) => state.userID.value);
  // const dispatch = useDispatch();
  const [userID, setUserID] = useState('selfId');
  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getUser('selfId');
        if (data) {
          setUserID(data._id);
        }
      } catch (e) {
        messageApi.error(e.message);
        setTimeout(() => { navigate('/'); }, 1000);
      }
    }
    fetchData();
  }, []);
  return (
    <div className="nav-container">
      {contextHolder}
      <div className="font">
        DOTS
      </div>
      <div className="icon-container">
        <Link to="/home">
          <img className="icon" src="/asset/icon-home.png" alt="home" />
        </Link>
        <Link to={`/profile/${userID}`} key={`/profile/${userID}`}>
          <img className="icon" src="/asset/icon-profile.png" alt="profile" />
        </Link>
        <Link to="/" onClick={() => { reAuthenticate(401); }}>
          <div className="logout">
            Log Out
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
