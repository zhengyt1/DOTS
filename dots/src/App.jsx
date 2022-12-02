import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import Login from './pages/login';
import Register from './pages/register';
import Home from './pages/home';
import Profile from './pages/profile';
import PostDetail from './components/postDetail';

function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<App />} /> */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Profile />}>
          <Route path=":userId" element={<div />} />
        </Route>
        <Route path="/post" element={<PostDetail />}>
          <Route path=":postId" element={<div />} />
        </Route>
        <Route
          path="*"
          element={(
            <div style={{ padding: '1rem' }}>
              <p>There is nothing here!</p>
            </div>
        )}
        />
      </Routes>
    </Router>
  );
}

export default App;
