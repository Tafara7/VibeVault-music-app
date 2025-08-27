import React from 'react';
import './Song.css';

const Song = ({ title, artist, album, url, deleted }) => {
  const spotifyEmbedUrl = url ? url.replace('open.spotify.com/track', 'open.spotify.com/embed/track') : '';

  return (
    <div className={`song ${deleted ? 'deleted' : ''}`}>
      <h3>{title}</h3>
      <p>{artist}</p>
      <p>{album}</p>
      {!deleted && url && (
        <iframe
          src={spotifyEmbedUrl}
          width="300"
          height="80"
          frameBorder="0"
          allowtransparency="true"
          allow="encrypted-media"
        ></iframe>
      )}
      {deleted && <p className="deleted-message">This song has been deleted.</p>}
    </div>
  );
};

export default Song;