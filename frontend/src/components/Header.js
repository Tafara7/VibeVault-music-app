import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

class Header extends Component {
  render() {
    return (
      <header className="header">
        <h1>VibeVault</h1>
        <nav>
          <ul>
            <li><Link to="/home">Home</Link></li>
            <li><Link to="/profile">Profile</Link></li>
            <li><Link to="/playlist">Playlist</Link></li>
          </ul>
        </nav>
      </header>
    );
  }
}

export default Header;