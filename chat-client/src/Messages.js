import React, { useEffect, useState } from 'react';
import './Messages.css';

const Messages = ({ socket, userName }) => {
  const [messages, setMessages] = useState({});
  const [user, setUser] = useState(null);
  useEffect(() => {

    const newUserListener = () => {
      setUser(userName);
      return user;
    }

    const messageListener = (message) => {
      setMessages((prevMessages) => {
        const newMessages = {...prevMessages};
        newMessages[message.id] = message;
        return newMessages;
      });
    };
  
    const deleteMessageListener = (messageID) => {
      setMessages((prevMessages) => {
        const newMessages = {...prevMessages};
        delete newMessages[messageID];
        return newMessages;
      });
    };
  
    socket.on('newUser', newUserListener);
    //socket.emit('newUser');
    socket.on('message', messageListener);
    socket.on('deleteMessage', deleteMessageListener);
    socket.emit('getMessages');

    return () => {
      socket.off('message', messageListener);
      socket.off('deleteMessage', deleteMessageListener);
    };
  }, [socket]);

  return (
    <div className="message-list">
      {[...Object.values(messages)]
        .sort((a, b) => a.time - b.time)
        .map((message) => (
          <div
            key={message.id}
            className="message-container"
            title={`Sent at ${new Date(message.time).toLocaleTimeString()}`}
          >
            <span className="user">{message.user}:</span>
            <span className="message">{message.value}</span>
            <span className="date">{new Date(message.time).toLocaleTimeString()}</span>
          </div>
        ))
      }
    </div>
  );
}

export default Messages;