import React, { Component } from 'react';
import ProfilePreview from './ProfilePreview';
import './Following.css';

class Following extends Component {
  render() {
    return (
      <div className="following">
        <h2>Following</h2>
        <ProfilePreview username="Following1" followers={200} />
        <ProfilePreview username="Following2" followers={250} />
      </div>
    );
  }
}

export default Following;