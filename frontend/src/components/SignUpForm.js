import React, { Component } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignUpForm.css';

class SignUpForm extends Component {
  state = {
    username: '',
    email: '',
    password: '',
    errors: {
      username: '',
      email: '',
      password: '',
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
        errors.username = value.length < 3 ? 'Username must be at least 3 characters long' : '';
        break;
      case 'email':
        errors.email = /\S+@\S+\.\S+/.test(value) ? '' : 'Email is invalid';
        break;
      case 'password':
        errors.password = value.length < 6 ? 'Password must be at least 6 characters long' : '';
        break;
      default:
        break;
    }

    this.setState({ errors });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { username, email, password, errors } = this.state;

    if (username && email && password && !errors.username && !errors.email && !errors.password) {
      try {
        const response = await fetch('http://localhost:3000/api/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, email, password }),
        });

        if (response.ok) {
          this.props.onLogin();
          this.props.navigate('/home');
        } else {
          alert('Error signing up');
        }
      } catch (error) {
        console.error('Error signing up:', error);
      }
    } else {
      alert('Please fill out the form correctly');
    }
  };

  render() {
    const { username, email, password, errors } = this.state;

    return (
      <div className="sign-up-form">
        <h2>Sign Up</h2>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label>Username:</label>
            <input type="text" name="username" value={username} onChange={this.handleChange} />
            {errors.username && <span className="error">{errors.username}</span>}
          </div>
          <div>
            <label>Email:</label>
            <input type="email" name="email" value={email} onChange={this.handleChange} />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>
          <div>
            <label>Password:</label>
            <input type="password" name="password" value={password} onChange={this.handleChange} />
            {errors.password && <span className="error">{errors.password}</span>}
          </div>
          <button type="submit">Sign Up</button>
        </form>
      </div>
    );
  }
}

const SignUpFormWithNavigate = (props) => {
  const navigate = useNavigate();
  return <SignUpForm {...props} navigate={navigate} />;
};

export default SignUpFormWithNavigate;