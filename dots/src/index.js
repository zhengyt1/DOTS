import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Login from './pages/login';
import Register from './pages/register';
import Home from './pages/home.js';
import Profile from './pages/profile'
import PostDetail from './components/postDetail';
import './index.css'
import store from './store'
import { Provider } from 'react-redux';


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  // <React.StrictMode>
    <Provider store={store}>
      <Router>
        <Routes>
          {/* <Route path="/" element={<App />} /> */}
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
          <Route path="/profile" element={<Profile />} > 
            <Route path=":userId" element={<></>} ></Route>
          </Route>
          <Route path="/post" element={<PostDetail />} >
            <Route path=":postId" element={<></>} />
          </Route>
          <Route path="*" element={
            <div style={{ padding: "1rem" }}>
              <p>There's nothing here!</p>
            </div>
          }></Route>
        </Routes>
      </Router>
    </Provider>
  // </React.StrictMode>
);