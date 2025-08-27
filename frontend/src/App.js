import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './UserContext';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import PlaylistPage from './pages/PlaylistPage';
import SongPage from './pages/SongPage';
import SplashPage from './pages/SplashPage';
import EditProfile from './components/EditProfile';
import FriendsList from './components/FriendsList';

class App extends Component {
  state = {
    isAuthenticated: false,
  };

  handleLogin = () => {
    this.setState({ isAuthenticated: true });
  };

  render() {
    const { isAuthenticated } = this.state;

    return (
      <UserProvider>
        <Router>
          {isAuthenticated ? (
            <>
              <Header />
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/playlist" element={<PlaylistPage />} />
                <Route path="/profile/:id" element={<ProfilePage />} />
                <Route path="/playlist/:id" element={<PlaylistPage />} />
                <Route path="/song/:id" element={<SongPage />} />
                {/* <Route path="/edit-profile" element={<EditProfile />} />
                <Route path="/friends-list" element={<FriendsList />} /> */}
              </Routes>
            </>
          ) : (
            <Routes>
              <Route path="*" element={<SplashPage onLogin={this.handleLogin} />} />
            </Routes>
          )}
        </Router>
      </UserProvider>
    );
  }
}

export default App;