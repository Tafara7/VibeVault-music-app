import React, { Component } from 'react';
import './CreatePlaylist.css';

class CreatePlaylist extends Component {
  state = {
    name: '',
    description: '',
    category: '',
    coverImage: '',
    hashtags: '',
    playlistCount: 0 
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { name, description, category, coverImage, hashtags } = this.state;
    const newPlaylist = {
      name,
      description,
      category,
      coverImage,
      hashtags: hashtags.split(',').map(tag => tag.trim())
    };
    // Submit the new playlist to the backend
  };

  render() {
    const { name, description, category, coverImage, hashtags, playlistCount } = this.state;
    return (
      <div className="create-playlist">
        <h2>Create Playlist</h2>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label>Playlist Name:</label>
            <input type="text" name="name" value={name} onChange={this.handleChange} placeholder={`New Playlist #${playlistCount + 1}`} />
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
          <button type="submit">Create</button>
        </form>
      </div>
    );
  }
}

export default CreatePlaylist;