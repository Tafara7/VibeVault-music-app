import React, { Component } from 'react';
import './AddComment.css';

class AddComment extends Component {
  state = {
    username: '',
    comment: '',
    errors: {
      username: '',
      comment: '',
    },
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value }, () => {
      this.validateField(name, value);
    });
  };

  validateField = (name, value) => {
    let errors = this.state.errors;

    switch (name) {
      case 'username':
        errors.username = value ? '' : 'Username is required';
        break;
      case 'comment':
        errors.comment = value ? '' : 'Comment is required';
        break;
      default:
        break;
    }

    this.setState({ errors });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { username, comment, errors } = this.state;

    if (username && comment && !errors.username && !errors.comment) {
      alert('Comment added successfully');
    } else {
      alert('Please fill out the form correctly');
    }
  };

  render() {
    const { username, comment, errors } = this.state;

    return (
      <div className="add-comment">
        <h3>Add Comment</h3>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label>Username:</label>
            <input type="text" name="username" value={username} onChange={this.handleChange} />
            {errors.username && <span className="error">{errors.username}</span>}
          </div>
          <div>
            <label>Comment:</label>
            <textarea name="comment" value={comment} onChange={this.handleChange}></textarea>
            {errors.comment && <span className="error">{errors.comment}</span>}
          </div>
          <button type="submit">Add Comment</button>
        </form>
      </div>
    );
  }
}

export default AddComment;