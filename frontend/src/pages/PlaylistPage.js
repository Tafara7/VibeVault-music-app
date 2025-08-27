import React, { Component, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { UserContext } from '../UserContext';
import Playlist from '../components/Playlist';
import EditPlaylist from '../components/EditPlaylist';
import CommentsList from '../components/CommentsList';
import AddComment from '../components/AddComment';
import './PlaylistPage.css';

class PlaylistPage extends Component {
  state = {
    playlist: null,
    loading: true,
    error: null
  };

  componentDidMount() {
    const { id } = this.props.params;
    const userId = this.props.userId;
    const playlistIdToFetch = id || userId;

    fetch(`http://localhost:3000/api/playlists/${playlistIdToFetch}`)
      .then(response => response.json())
      .then(data => this.setState({ playlist: data, loading: false }))
      .catch(error => this.setState({ error, loading: false }));
  }

  handleAddSong = (song) => {
    const { playlist } = this.state;
    playlist.songs.push(song);
    this.setState({ playlist });
  };

  handleRemoveSong = (songId) => {
    const { playlist } = this.state;
    playlist.songs = playlist.songs.filter(song => song.songid !== songId);
    this.setState({ playlist });
  };

  handleReorderSongs = (songs) => {
    const { playlist } = this.state;
    playlist.songs = songs;
    this.setState({ playlist });
  };

  handleEditPlaylist = (updatedPlaylist) => {
    this.setState({ playlist: updatedPlaylist });
  };

  handleDeletePlaylist = () => {
    const { id } = this.props.params;
    fetch(`http://localhost:3000/api/playlists/${id}`, {
      method: 'DELETE'
    })
      .then(() => {
        this.props.navigate('/home');
      })
      .catch(error => console.error('Error deleting playlist:', error));
  };

  handleUpdateComments = (comments) => {
    const { playlist } = this.state;
    playlist.comments = comments;
    this.setState({ playlist });
  };

  render() {
    const { playlist, loading, error } = this.state;

    if (loading) {
      return <div>Loading...</div>;
    }

    if (error) {
      return <div>Error loading playlist: {error.message}</div>;
    }

    return (
      <div className="playlist-page">
        {playlist && (
          <>
            <div className="playlist-header">
              <h2>{playlist.name}</h2>
              <button onClick={this.handleDeletePlaylist}>Delete Playlist</button>
            </div>
            <Playlist {...playlist} onAddSong={this.handleAddSong} onRemoveSong={this.handleRemoveSong} onReorderSongs={this.handleReorderSongs} />
            <EditPlaylist playlist={playlist} onEdit={this.handleEditPlaylist} />
            <CommentsList comments={playlist.comments || []} playlistId={playlist.playlistid} onUpdateComments={this.handleUpdateComments} />
            <AddComment playlistId={playlist.playlistid} />
          </>
        )}
      </div>
    );
  }
}

const PlaylistPageWithContext = (props) => {
  const { userId } = useContext(UserContext);
  const params = useParams();
  const navigate = useNavigate();
  return <PlaylistPage {...props} userId={userId} params={params} navigate={navigate} />;
};

export default PlaylistPageWithContext;