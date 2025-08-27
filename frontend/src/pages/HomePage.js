import React, { Component } from 'react';
import SongFeed from '../components/SongFeed';
import PlaylistFeed from '../components/PlaylistFeed';
import SearchInput from '../components/SearchInput';
import './HomePage.css';

class HomePage extends Component {
  state = {
    currentFeed: 'songs',
    searchResults: []
  };

  switchToSongFeed = () => {
    this.setState({ currentFeed: 'songs' });
  };

  switchToPlaylistFeed = () => {
    this.setState({ currentFeed: 'playlists' });
  };

  handleSearchResults = (results) => {
    this.setState({ searchResults: results });
  };

  render() {
    const { currentFeed, searchResults } = this.state;

    return (
      <div className="home-page">
        <SearchInput onSearchResults={this.handleSearchResults} />
        {searchResults.length > 0 ? (
          <div className="search-results">
            {searchResults.map((result, index) => (
              <div key={index} className="search-result-item">
                <div className="result-info">
                  {result.item.username && <a href={`/profile/${result.item.userid}`}>{result.item.username}</a>}
                  {result.item.name && <a href={`/playlist/${result.item.playlistid}`}>{result.item.name}</a>}
                  {result.item.title && <a href={`/song/${result.item.songid}`}>{result.item.title}</a>}
                </div>
                <div className="result-actions">
                  <button>🔍</button>
                  <button>❤️</button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            <div className="feed-switcher">
              <button onClick={this.switchToSongFeed}>Song Feed</button>
              <button onClick={this.switchToPlaylistFeed}>Playlist Feed</button>
            </div>
            {currentFeed === 'songs' ? <SongFeed /> : <PlaylistFeed />}
          </>
        )}
      </div>
    );
  }
}

export default HomePage;