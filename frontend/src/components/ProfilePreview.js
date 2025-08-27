import React, { Component } from 'react';
import './ProfilePreview.css';

class ProfilePreview extends Component {
  render() {
    const { username, followers, online } = this.props;
    return (
      <div className="profile-preview">
        <h2>{username}</h2>
        <p>Followers: {followers}</p>
        {online && <p>Online</p>}
      </div>
    );
  }
}

export default ProfilePreview;