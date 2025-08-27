import React, { Component } from 'react';
import './EditProfile.css';


class EditProfile extends Component {
  state = {
    username: this.props.user.username,
    bio: this.props.user.bio,
    errors: {}
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { username, bio } = this.state;

    fetch(`http://localhost:3000/api/users/${this.props.user.userId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, bio }),
    })
      .then(response => response.json())
      .then(data => {
        // Update the user data in the state
        this.props.user.username = data.username;
        this.props.user.bio = data.bio;
        this.forceUpdate();
      })
      .catch(error => console.error('Error updating profile:', error));
  };

  render() {
    const { username, bio, errors } = this.state;

    return (
      <div className="edit-profile">
        <h2>Edit Profile</h2>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label>Username:</label>
            <input type="text" name="username" value={username} onChange={this.handleChange} />
            {errors.username && <span className="error">{errors.username}</span>}
          </div>
          <div>
            <label>Bio:</label>
            <textarea name="bio" value={bio} onChange={this.handleChange}></textarea>
            {errors.bio && <span className="error">{errors.bio}</span>}
          </div>
          <button type="submit">Save</button>
        </form>
      </div>
    );
  }
}

export default EditProfile;