import React, { Component } from 'react';
import LoginForm from '../components/LoginForm';
import SignUpForm from '../components/SignUpForm';
import './SplashPage.css';

class SplashPage extends Component {
  render() {
    const { onLogin } = this.props;

    return (
      <div className="splash-page">
        <img src="/assets/images/music.jpg" alt="Background" className="parallax-background" />
        <div className="content">
          <h1>Welcome to VibeVault</h1>
          <h2>Your ultimate music experience</h2>
          <p>Discover, share, and enjoy your favorite tunes with VibeVault. Join our community of music lovers today!</p>
          <div className="forms">
            <LoginForm onLogin={onLogin} />
            <SignUpForm onLogin={onLogin} />
          </div>
        </div>
      </div>
    );
  }
}

export default SplashPage;