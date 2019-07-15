import React, { Component } from 'react';
import { Widget, addResponseMessage, setQuickButtons, toggleMsgLoader } from '../index';
import uuidv1 from 'uuid/v1';


export default class App extends Component {
  userIp = null;
  componentDidMount() {
    const historyNode = localStorage.getItem('history');
    const script = document.createElement('script');
    if (!historyNode) {
      addResponseMessage('Вітаємо вас у волоцюзі. Напишіть фрукт');
    }

    script.src ='https://l2.io/ip.js?var=userIp';
    script.async = true;
    document.body.appendChild(script);
  }

  handleNewUserMessage = (newMessage) => {
    toggleMsgLoader();
    setTimeout(() => {
      toggleMsgLoader();      
      if (newMessage === 'фрукт') {
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
        title="Здарова"
        subtitle="Це волоцюга"
        senderPlaceHolder="Дайте знать..."
        handleNewUserMessage={this.handleNewUserMessage}
        handleQuickButtonClicked={this.handleQuickButtonClicked}
        badge={1}
        checkToken={this.checkToken}
      />
    );
  }
}
