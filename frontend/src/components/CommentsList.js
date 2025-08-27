import React, { Component } from 'react';
import './CommentsList.css';

class CommentsList extends Component {
  handlePinComment = (commentId) => {
    const { playlistId } = this.props;
    fetch(`http://localhost:3000/api/playlists/${playlistId}/comments/${commentId}/pin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(response => response.json())
      .then(data => {
        this.props.onUpdateComments(data.comments);
      })
      .catch(error => console.error('Error pinning comment:', error));
  };

  handleDeleteComment = (commentId) => {
    const { playlistId } = this.props;
    fetch(`http://localhost:3000/api/playlists/${playlistId}/comments/${commentId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(response => response.json())
      .then(data => {
        this.props.onUpdateComments(data.comments);
      })
      .catch(error => console.error('Error deleting comment:', error));
  };

  render() {
    const { comments } = this.props;
    return (
      <div className="comments-list">
        <h2>Comments</h2>
        {comments.map(comment => (
          <div key={comment._id} className="comment">
            <p>{comment.text}</p>
            <p>By: {comment.username}</p>
            <button onClick={() => this.handlePinComment(comment._id)}>Pin</button>
            <button onClick={() => this.handleDeleteComment(comment._id)}>Delete</button>
          </div>
        ))}
      </div>
    );
  }
}

export default CommentsList;