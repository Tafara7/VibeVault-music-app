import React, { Component } from 'react';
import './SearchInput.css';

class SearchInput extends Component {
  state = {
    query: '',
    results: []
  };

  handleChange = async (e) => {
    const query = e.target.value;
    this.setState({ query });

    if (query.length > 2) {
      const response = await fetch(`http://localhost:3000/api/search?query=${query}`);
      const data = await response.json();
      this.setState({ results: data.results });
    } else {
      this.setState({ results: [] });
    }
  };

  render() {
    const { query, results } = this.state;

    return (
      <div className="search-input">
        <input
          type="text"
          placeholder="Search..."
          value={query}
          onChange={this.handleChange}
        />
        {results.length > 0 && (
          <div className="autocomplete-results">
            {results.map((result, index) => (
              <div key={index} className="autocomplete-item">
                {result.item.username && <a href={`/profile/${result.item.userid}`}>{result.item.username}</a>}
                {result.item.name && <a href={`/playlist/${result.item.playlistid}`}>{result.item.name}</a>}
                {result.item.title && <a href={`/song/${result.item.songid}`}>{result.item.title}</a>}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
}

export default SearchInput;