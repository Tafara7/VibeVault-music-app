import React, { Component } from 'react';
import Song from './Song';
import './UserSongs.css';

class UserSongs extends Component {
  render() {
    return (
      <div className="user-songs">
        <h2>Your Songs</h2>
        <Song title="Song Title 1" artist="Artist Name 1" album="Album Name 1" />
        <Song title="Song Title 2" artist="Artist Name 2" album="Album Name 2" />
      </div>
    );
  }
}

export default UserSongs;