import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import './Profile.css';


class Profile extends Component {
  handleProfilePictureChange = (file) => {
    const formData = new FormData();
    formData.append('profilePicture', file);

    fetch(`http://localhost:3000/api/users/${this.props.user.userId}/profile-picture`, {
      method: 'POST',
      body: formData
    })
      .then(response => response.json())
      .then(data => {
        this.props.user.profilePicture = data.profilePicture;
        this.forceUpdate();
      })
      .catch(error => console.error('Error uploading profile picture:', error));
  };

  render() {
    const { user, isOwnProfile } = this.props;
    const profilePicture = user.profilePicture || `https://via.placeholder.com/150?text=${user.username.charAt(0)}`;

    return (
      <div className="profile">
        <img src={profilePicture} alt="Profile" className="profile-picture" />
        {isOwnProfile && (
          <Dropzone onDrop={acceptedFiles => this.handleProfilePictureChange(acceptedFiles[0])}>
            {({ getRootProps, getInputProps }) => (
              <div {...getRootProps()} className="dropzone">
                <input {...getInputProps()} />
                <p>Drag 'n' drop a profile picture here, or click to select one</p>
              </div>
            )}
          </Dropzone>
        )}
        <h2>{user.username}</h2>
        <p>{user.bio}</p>
      </div>
    );
  }
}

export default Profile;