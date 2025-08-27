import React, { Component, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../UserContext';
import './LoginForm.css';

class LoginForm extends Component {
  state = {
    username: '',
    password: '',
    errors: {
      username: '',
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
    const { username, password, errors } = this.state;

    if (username && password && !errors.username && !errors.password) {
      try {
        const response = await fetch('http://localhost:3000/api/users/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, password }),
        });

        if (response.ok) {
          const user = await response.json();
          this.props.setUserId(user.userId); // Set userId in context
          this.props.onLogin();
          this.props.navigate('/home');
        } else {
          alert('Invalid credentials');
        }
      } catch (error) {
        console.error('Error logging in:', error);
      }
    } else {
      alert('Please fill out the form correctly');
    }
  };

  render() {
    const { username, password, errors } = this.state;

    return (
      <div className="login-form">
        <h2>Login</h2>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label>Username:</label>
            <input type="text" name="username" value={username} onChange={this.handleChange} />
            {errors.username && <span className="error">{errors.username}</span>}
          </div>
          <div>
            <label>Password:</label>
            <input type="password" name="password" value={password} onChange={this.handleChange} />
            {errors.password && <span className="error">{errors.password}</span>}
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    );
  }
}

const LoginFormWithNavigate = (props) => {
  const navigate = useNavigate();
  const { setUserId } = useContext(UserContext);
  return <LoginForm {...props} navigate={navigate} setUserId={setUserId} />;
};

export default LoginFormWithNavigate;