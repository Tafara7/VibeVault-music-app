import React, { Component } from 'react';
import './UserPlaylists.css';

class UserPlaylists extends Component {
  render() {
    const { playlists = [] } = this.props; 

    return (
      <div className="user-playlists">
        {playlists.length > 0 ? (
          playlists.map(playlist => (
            <div key={playlist.playlistid} className="playlist-item">
              <h3>{playlist.name}</h3>
              <p>{playlist.description}</p>
            </div>
          ))
        ) : (
          <p>No playlists available</p>
        )}
      </div>
    );
  }
}

export default UserPlaylists;