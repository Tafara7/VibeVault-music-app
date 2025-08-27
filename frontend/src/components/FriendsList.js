import React, { Component } from 'react';
import ProfilePreview from './ProfilePreview';
import './FriendsList.css';

class FriendsList extends Component {
  render() {
    const { friends } = this.props;

    return (
      <div className="friends-list">
        <h2>Friends</h2>
        {friends.length > 0 ? (
          friends.map(friend => (
            <ProfilePreview key={friend.userId} username={friend.username} followers={friend.followers.length} online={friend.online} />
          ))
        ) : (
          <p>No friends</p>
        )}
      </div>
    );
  }
}

export default FriendsList;