import React, { Component } from 'react';
import { Widget, addResponseMessage, setQuickButtons, toggleMsgLoader, addFileSnippet, addLinkSnippet } from '../index';
import uuidv1 from 'uuid/v1';
import PubNubReact from 'pubnub-react';


export default class App extends Component {
  constructor() {
    super();
    this.pubnub = new PubNubReact({ publishKey: '', subscribeKey: '' });
    this.pubnub.init(this);
    this.userIp = null;
  }
  componentDidMount() {
    const historyNode = localStorage.getItem('history');
    const script = document.createElement('script');
    if (!historyNode) {
      addResponseMessage('Welcome at local help, tell me fruit');
    }
    script.src ='https://l2.io/ip.js?var=userIp';
    script.async = true;
    document.body.appendChild(script);

    this.pubnub.subscribe({
      channels: ['Channel-pmggt78wh'],
      withPresence: true
    });

    this.pubnub.getMessage('Channel-pmggt78wh', (msg) => {
      this.handleNewUserMessage(msg.message.text);
    });

  }

  handleNewUserMessage = (newMessage) => {
    toggleMsgLoader();
    setTimeout(() => {
      toggleMsgLoader();      
      if (newMessage === 'fruit') {
        setQuickButtons([ { label: 'Apple', value: 'apple' }, { label: 'Orange', value: 'orange' }, { label: 'Pear', value: 'pear' }, { label: 'Banana', value: 'banana' } ]);
      } else {
        addResponseMessage(newMessage);
      }
    }, 2000);
  };

  handleQuickButtonClicked = (e) => {
    addResponseMessage('Selected ' + e);
    setQuickButtons([]);
  };

  checkToken = () => {
    const token = localStorage.getItem('token');
    if (token) {
      /**
       * TODO request history
       */
    } else {
      localStorage.setItem('token', uuidv1());
    }
  };

  render() {
    return (
      <Widget
        title="Welcome"
        subtitle="Local Help Bot"
        senderPlaceHolder="Tell me what..."
        handleNewUserMessage={this.handleNewUserMessage}
        handleQuickButtonClicked={this.handleQuickButtonClicked}
        badge={1}
        checkToken={this.checkToken}
      />
    );
  }
}
