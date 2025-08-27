import React, { Component } from 'react';
import { useParams } from 'react-router-dom';
import Song from '../components/Song';
// import './SongPage.css';

class SongPage extends Component {
  state = {
    song: null,
    loading: true,
    error: null
  };

  componentDidMount() {
    const { id } = this.props.params;
    fetch(`http://localhost:3000/api/songs/${id}`)
      .then(response => response.json())
      .then(data => this.setState({ song: data, loading: false }))
      .catch(error => this.setState({ error, loading: false }));
  }

  render() {
    const { song, loading, error } = this.state;

    if (loading) {
      return <div>Loading...</div>;
    }

    if (error) {
      return <div>Error loading song: {error.message}</div>;
    }

    return (
      <div className="song-page">
        <Song {...song} />
      </div>
    );
  }
}

export default (props) => <SongPage {...props} params={useParams()} />;