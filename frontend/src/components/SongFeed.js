import React, { Component } from 'react';
import Song from './Song';
import './SongFeed.css';

class SongFeed extends Component {
  state = {
    songs: []
  };

  componentDidMount() {
    fetch('http://localhost:3000/api/songs')
      .then(response => response.json())
      .then(data => this.setState({ songs: data.songs }))
      .catch(error => console.error('Error fetching songs:', error));
  }

  render() {
    const { songs } = this.state;
    return (
      <div className="song-feed">
        <h2>Song Feed</h2>
        {songs.map(song => (
          <Song key={song._id} title={song.title} artist={song.artist} url={song.url} />
        ))}
      </div>
    );
  }
}

export default SongFeed;