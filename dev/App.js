import React, { Component } from 'react';
import { Widget, addResponseMessage, setQuickButtons, toggleMsgLoader } from '../index';

export default class App extends Component {
  componentDidMount() {
    addResponseMessage('Раді Вас вітати у цьому чудовому чаті!');
  }

  handleNewUserMessage = (newMessage) => {    
    toggleMsgLoader();
    setTimeout(() => {
      toggleMsgLoader();      
      if (newMessage === 'fruits') {
        setQuickButtons([ { label: 'Apple', value: 'apple' }, { label: 'Orange', value: 'orange' }, { label: 'Pear', value: 'pear' }, { label: 'Banana', value: 'banana' } ]);
      } else {
        addResponseMessage(newMessage);
      }
    }, 2000);
  }

  handleQuickButtonClicked = (e) => {
    addResponseMessage('Selected ' + e);
    setQuickButtons([]);
  }

  render() {
    return (
      <Widget
        title="юр-бот 100% Життя"
        subtitle="Тут Ви зможете отримати відповіді на юридичні питання, що стосуються захисту прав ЛЖВ, представників ключових спільнот та людей, які хворіють на ТБ"
        senderPlaceHolder="Напишіть нам..."
        handleNewUserMessage={this.handleNewUserMessage}
        handleQuickButtonClicked={this.handleQuickButtonClicked}
        titleAvatar="//network.org.ua/wp-content/uploads/2018/12/logo.svg"
      />
    );
  }
}
