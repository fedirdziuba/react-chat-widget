import React from 'react';
import PropTypes from 'prop-types';

import close from '@assets/clear-button.svg';

import './style.scss';


const Header = ({ title, subtitle, toggleChat, showCloseButton, titleAvatar }) =>
  <div className="rcw-header">
    <div className="first-row">
      {titleAvatar && <img src={titleAvatar} className="avatar" alt="profile" />}
      {showCloseButton &&
        <button className="rcw-close-button" onClick={toggleChat}>
          <img src={close} className="rcw-close" alt="close" />
        </button>
      }
      <h4 className="rcw-title">
        {title}
      </h4>
    </div>
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
