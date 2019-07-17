import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import send from '@assets/send_button.svg';
import upload from '@assets/upload.png';
import file from '@assets/file.png';
import audio from '@assets/audio.png';
import video from '@assets/video.png';

import './style.scss';

class Files extends Component{

  removeItem = (index) => {
    this.props.removeAttachment(index)
  };

  render() {
    const { fileList } = this.props;
    if (!fileList.length) return null;
    const content = fileList.map((fileURL, index) => {
      return (
        <div id="file" key={index}>
          <div className="deleter" onClick={this.removeItem(index)}></div>
          <img className="upload-thumb" src={fileURL} alt="img" />
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
    message: '',
    fileURLs: []
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
    console.log(event.target.files[0]);
    if (event.target.files.length > 0) {
      const fileObj = event.target.files[0];
      const fileType = event.target.files[0].type;
      if (/^video/.test(fileType)) {
        this.setState({
          fileURLs: [...this.state.fileURLs, video]
        });
      } else if (/^audio/.test(fileType)) {
        this.setState({
          fileURLs: [...this.state.fileURLs, audio]
        });
      } else if (/^image/.test(fileType)) {
        this.setState({
          fileURLs: [...this.state.fileURLs, URL.createObjectURL(fileObj)]
        });
      } else {
        this.setState({
          fileURLs: [...this.state.fileURLs, file]
        });
      }
      this.setState({
        files: [...this.state.files, fileObj]
      });
    }
  };

  removeAttachment = () => {
  };

  validateFile = (file) => {
    let errors = [];
    const maxFileSize = 64000000;
    const maxFiles = 5;
    if (this.state.files.length > maxFiles) {
      errors.push('Only up to 5 files allowed')
    }
    if (file.size > maxFileSize) {
      errors.push('File exceeds 64M size')
    }
    return errors;
  };

  submitForm = event => {
    this.props.sendMessage(event, this.state.fileURLs);
    this.setState({ files: [], fileURLs: [] });
  };

  render() {
    const { placeholder, disabledInput, autofocus } = this.props;
    const { fileURLs: fileList } = this.state;
    return (
      <Fragment>
        {!!fileList.length ? <Files fileList={fileList} removeAttachment={this.removeAttachment} /> : false}
        <form className="rcw-sender" onSubmit={this.submitForm}>
          <button type="button" className="rcw-send" onClick={this.selectFile}>
            <img src={upload} className="rcw-send-icon" alt="send" />
          </button>
          <input
            type="file"
            className="rcw-new-file"
            name="file"
            ref={this.file}
            onChange={this.handleChange}
          />
          <input type="text"
                 className="rcw-new-message"
                 name="message"
                 placeholder={placeholder}
                 disabled={disabledInput}
                 autoFocus={autofocus}
                 autoComplete="off"
                 ref={this.input}
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
