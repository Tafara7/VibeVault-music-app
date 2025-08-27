import React, { Component } from 'react';
import ProfilePreview from './ProfilePreview';
import './Followers.css';

class Followers extends Component {
  render() {
    return (
      <div className="followers">
        <h2>Followers</h2>
        <ProfilePreview username="Follower1" followers={100} />
        <ProfilePreview username="Follower2" followers={150} />
      </div>
    );
  }
}

export default Followers;