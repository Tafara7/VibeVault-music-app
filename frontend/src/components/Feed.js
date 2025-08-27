import React, { Component } from 'react';
import PlaylistPreview from './PlaylistPreview';
import './Feed.css';

class Feed extends Component {
  state = {
    playlists: []
  };

  componentDidMount() {
    fetch('http://localhost:3000/api/playlists/feed')
      .then(response => response.json())
      .then(data => this.setState({ playlists: data.playlists }))
      .catch(error => console.error('Error fetching feed:', error));
  }

  render() {
    const { playlists } = this.state;
    return (
      <div className="feed">
        <h2>Feed</h2>
        {playlists.map(playlist => (
          <PlaylistPreview key={playlist._id} name={playlist.name} songCount={playlist.songs.length} />
        ))}
      </div>
    );
  }
}

export default Feed;