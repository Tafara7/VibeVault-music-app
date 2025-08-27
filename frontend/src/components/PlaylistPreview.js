import React, { Component } from 'react';
import './PlaylistPreview.css';

class PlaylistPreview extends Component {
  render() {
    const { name, songCount } = this.props;
    return (
      <div className="playlist-preview">
        <h2>{name}</h2>
        <p>Songs: {songCount}</p>
      </div>
    );
  }
}

export default PlaylistPreview;