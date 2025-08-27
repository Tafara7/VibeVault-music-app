import React, { Component, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { UserContext } from '../UserContext';
import Profile from '../components/Profile';
import UserPlaylists from '../components/UserPlaylists';
import FriendsList from '../components/FriendsList';
import EditProfile from '../components/EditProfile';
import './ProfilePage.css';

class ProfilePage extends Component {
  state = {
    user: null,
    createdPlaylists: [],
    savedPlaylists: [],
    friends: [],
    isOwnProfile: false,
    isFriend: false,
    loading: true,
    error: null
  };

  componentDidMount() {
    const { id } = this.props.params;
    const userId = this.props.userId;
    this.setState({ isOwnProfile: id === userId });
    const userIdToFetch = id || userId;

    Promise.all([
      fetch(`http://localhost:3000/api/users/${userIdToFetch}`).then(response => response.json()),
      fetch(`http://localhost:3000/api/playlists?createdBy=${userIdToFetch}`).then(response => response.json()),
      fetch(`http://localhost:3000/api/playlists?savedBy=${userIdToFetch}`).then(response => response.json()),
      fetch(`http://localhost:3000/api/users/${userIdToFetch}/friends`).then(response => response.json())
    ])
      .then(([user, createdPlaylists, savedPlaylists, friends]) => {
        const isFriend = friends.some(friend => friend.userId === userId);
        this.setState({
          user,
          createdPlaylists: createdPlaylists.playlists,
          savedPlaylists: savedPlaylists.playlists,
          friends,
          isFriend,
          loading: false
        });
      })
      .catch(error => this.setState({ error, loading: false }));
  }

  handleSendFriendRequest = () => {
    const { userId } = this.props;
    const { user } = this.state;

    fetch(`http://localhost:3000/api/users/${user.userId}/friend-request`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ requesterId: userId }),
    })
      .then(response => response.json())
      .then(data => {
        alert(data.message);
      })
      .catch(error => console.error('Error sending friend request:', error));
  };

  handleUnfriend = () => {
    const { userId } = this.props;
    const { user } = this.state;

    fetch(`http://localhost:3000/api/users/${user.userId}/unfriend`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ friendId: userId }),
    })
      .then(response => response.json())
      .then(data => {
        alert(data.message);
        this.setState({ isFriend: false });
      })
      .catch(error => console.error('Error unfriending:', error));
  };

  render() {
    const { user, createdPlaylists, savedPlaylists, friends, isOwnProfile, isFriend, loading, error } = this.state;

    if (loading) {
      return <div>Loading...</div>;
    }

    if (error) {
      return <div>Error loading profile: {error.message}</div>;
    }

    return (
      <div className="profile-page">
        <Profile user={user} isOwnProfile={isOwnProfile} />
        <EditProfile user={user} />
        <FriendsList friends={friends} />
        <button onClick={this.handleSendFriendRequest}>Send Friend Request</button>
        <UserPlaylists createdPlaylists={createdPlaylists} savedPlaylists={savedPlaylists} />
        <button onClick={this.handleUnfriend}>Unfriend</button>
      </div>
    );
  }
}

const ProfilePageWithContext = (props) => {
  const { userId } = useContext(UserContext);
  const params = useParams();
  return <ProfilePage {...props} userId={userId} params={params} />;
};

export default ProfilePageWithContext;