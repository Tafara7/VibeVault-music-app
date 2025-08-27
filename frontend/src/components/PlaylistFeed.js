import React, { Component } from 'react';
import PlaylistPreview from './PlaylistPreview';
import './PlaylistFeed.css';

class PlaylistFeed extends Component {
  state = {
    playlists: []
  };

  componentDidMount() {
    fetch('http://localhost:3000/api/playlists/feed')
      .then(response => response.json())
      .then(data => this.setState({ playlists: data.playlists }))
      .catch(error => console.error('Error fetching playlists:', error));
  }

  render() {
    const { playlists } = this.state;
    return (
      <div className="playlist-feed">
        <h2>Playlist Feed</h2>
        {playlists.map(playlist => (
          <div key={playlist._id} className="playlist-activity">
            <p>{playlist.createdBy.username} created a new playlist called <strong>{playlist.name}</strong></p>
            <PlaylistPreview name={playlist.name} songCount={playlist.songs.length} />
          </div>
        ))}
      </div>
    );
  }
}

export default PlaylistFeed;