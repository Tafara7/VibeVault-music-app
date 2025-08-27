import React, { Component } from 'react';
import Song from './Song';
import './Playlist.css';

class Playlist extends Component {
  handleAddSong = () => {
    const song = { title: 'New Song', artist: 'New Artist', album: 'New Album' };
    this.props.onAddSong(song);
  };

  handleRemoveSong = (songId) => {
    this.props.onRemoveSong(songId);
  };

  handleReorderSongs = (songs) => {
    this.props.onReorderSongs(songs);
  };

  render() {
    const { name, description, category, coverImage, hashtags, songs } = this.props;
    return (
      <div className="playlist">
        <h2>{name}</h2>
        <p>{description}</p>
        <p>Category: {category}</p>
        {coverImage && <img src={coverImage} alt={`${name} cover`} className="cover-image" />}
        <div className="hashtags">
          {hashtags.map((hashtag, index) => (
            <span key={index} className="hashtag">#{hashtag}</span>
          ))}
        </div>
        <div className="songs">
          {songs.map((song, index) => (
            <Song key={index} {...song} onRemove={() => this.handleRemoveSong(song._id)} />
          ))}
        </div>
        <button onClick={this.handleAddSong}>Add Song</button>
      </div>
    );
  }
}

export default Playlist;