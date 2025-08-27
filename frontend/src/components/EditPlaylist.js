import React, { Component } from 'react';
import './EditPlaylist.css';

class EditPlaylist extends Component {
  state = {
    name: this.props.playlist.name,
    description: this.props.playlist.description,
    category: this.props.playlist.category,
    coverImage: this.props.playlist.coverImage,
    hashtags: this.props.playlist.hashtags.join(', ')
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { name, description, category, coverImage, hashtags } = this.state;
    const updatedPlaylist = {
      ...this.props.playlist,
      name,
      description,
      category,
      coverImage,
      hashtags: hashtags.split(',').map(tag => tag.trim())
    };
    fetch(`http://localhost:3000/api/playlists/${this.props.playlist._id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedPlaylist)
    })
      .then(response => response.json())
      .then(data => {
        this.props.onEdit(data);
      })
      .catch(error => console.error('Error updating playlist:', error));
  };

  render() {
    const { name, description, category, coverImage, hashtags } = this.state;
    return (
      <div className="edit-playlist">
        <h2>Edit Playlist</h2>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label>Playlist Name:</label>
            <input type="text" name="name" value={name} onChange={this.handleChange} />
          </div>
          <div>
            <label>Description:</label>
            <textarea name="description" value={description} onChange={this.handleChange}></textarea>
          </div>
          <div>
            <label>Category:</label>
            <input type="text" name="category" value={category} onChange={this.handleChange} />
          </div>
          <div>
            <label>Cover Image URL:</label>
            <input type="text" name="coverImage" value={coverImage} onChange={this.handleChange} />
          </div>
          <div>
            <label>Hashtags (comma separated):</label>
            <input type="text" name="hashtags" value={hashtags} onChange={this.handleChange} />
          </div>
          <button type="submit">Save</button>
        </form>
      </div>
    );
  }
}

export default EditPlaylist;