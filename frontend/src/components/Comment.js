import React, { Component } from 'react';
import './Comment.css';

class Comment extends Component {
  render() {
    const { username, text } = this.props;
    return (
      <div className="comment">
        <h4>{username}</h4>
        <p>{text}</p>
      </div>
    );
  }
}

export default Comment;