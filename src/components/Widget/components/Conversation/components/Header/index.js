import React from 'react';
import PropTypes from 'prop-types';

import close from '@assets/clear-button.svg';

import './style.scss';


const Header = ({ title, subtitle, toggleChat, showCloseButton, titleAvatar }) =>
  <div className="rcw-header">
    <div className="auth">
      <div className="register">
        <span>Register</span>

      </div>
      <div className="login">
        <span>Login</span>
        {/*<div className="dropdown">*/}
          {/*<span>Login with Google</span>*/}
          {/*<span>Login with Facebook</span>*/}
        {/*</div>*/}
      </div>
    </div>
    {showCloseButton &&
      <button className="rcw-close-button" onClick={toggleChat}>
        <img src={close} className="rcw-close" alt="close" />
      </button>
    }
    <h4 className="rcw-title">
      {titleAvatar && <img src={titleAvatar} className="avatar" alt="profile" />}
      {title}
    </h4>
    <span>{subtitle}</span>
  </div>;

Header.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  toggleChat: PropTypes.func,
  showCloseButton: PropTypes.bool,
  titleAvatar: PropTypes.string
};
export default Header;
