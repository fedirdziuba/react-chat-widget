import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import send from '@assets/send_button.svg';
import upload from '@assets/upload.png';
import file from '@assets/file.png';

import './style.scss';

class Files extends Component{

  render() {
    const { fileList } = this.props;
    if (!fileList.length) return null;
    const content = fileList.map((fileURL, index) => {
      return (
        <div id="file" key={index}>
          <img className="upload-thumb" src={/^image/.test(fileURL.type) ? URL.createObjectURL(fileURL) : file} alt="img" />
        </div>
      )
    });
    return (
      <div id="files">
        {content}
      </div>
    )
  }
}

class Sender extends Component{
  state = {
    files: [],
    message: ''
  };
  input = React.createRef();
  file = React.createRef();

  componentDidUpdate() {
    this.input.current.focus();
  }

  selectFile = () => {
    this.file.current.click();
  };

  handleChange = (event) => {
    event.preventDefault();
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.setState(prevState => {
        return prevState.files.push(file);
      });
    }
    if (event.target.message) {
      this.setState({ message: event.target.message.value });
    }
  };

  validateFile = (file) => {
    let errors = [];
    const allowedFiles = {
      video: ['webm', 'mkv', 'flv', 'avi', 'wmv', 'm4v'],
      audio: ['mp3', 'flac', 'aiff', 'aif'],
      image: ['jpeg', 'jpg', 'image/png', 'gif', 'psd', 'psp'],
      application: ['application/msword', 'doc', 'docx', 'xml', 'xmlx', 'ppt', 'pptx', 'text/csv']
    };
    const maxFileSize = 64000000;
    const maxFiles = 5;
    if (this.state.files.length > maxFiles) {
      errors.push('Only up to 5 files allowed')
    }
    if (file.size > maxFileSize) {
      errors.push('File exceeds 64M size')
    }
    if (false) {
      errors.push('Unsupported file type');
    }
    return errors;
  };

  render() {
    const { sendMessage, placeholder, disabledInput, autofocus } = this.props;
    const { files: fileList } = this.state;
    return (
      <Fragment>
        {!!fileList.length ? <Files fileList={fileList} /> : false}
        <form className="rcw-sender" onSubmit={() => {
          return !!fileList.length || !this.state.message ? false : sendMessage
        }}>
          <button type="submit" className="rcw-send" onClick={this.selectFile}>
            <img src={upload} className="rcw-send-icon" alt="send" />
          </button>
          <input type="file" className="rcw-new-file" name="file" ref={this.file}  onChange={this.handleChange} />
          <input type="text"
                 className="rcw-new-message"
                 name="message"
                 placeholder={placeholder}
                 disabled={disabledInput}
                 autoFocus={autofocus}
                 autoComplete="off"
                 ref={this.input}
                 onChange={this.handleChange}
          />
          <button type="submit" className="rcw-send">
            <img src={send} className="rcw-send-icon" alt="send" />
          </button>
        </form>
      </Fragment>
    );
  }

}

Sender.propTypes = {
  sendMessage: PropTypes.func,
  placeholder: PropTypes.string,
  disabledInput: PropTypes.bool,
  autofocus: PropTypes.bool
};

export default Sender;
