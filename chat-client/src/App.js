import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import Messages from './Messages';
import MessageInput from './MessageInput';

import './App.css';

const App = () => {
  const [socket, setSocket] = useState(null);
  const [userName, setUserName] = useState('meow');

  useEffect(() => {
    const newSocket = io(`http://${window.location.hostname}:3000`);
    setSocket(newSocket);

    var username = prompt("What is your name?");
    setUserName(username);

    return () => newSocket.close();
  }, [setSocket, setUserName]);

  return (
    <div className="App">
      <header className="app-header">
       <center> React App Chat</center>
      </header>
      { socket ? (
        <div className="chat-container">
          <Messages socket={socket} userName={userName}/>
          <MessageInput socket={socket} />
        </div>
      ) : (
        <div>Not Connected</div>
      )}
    </div>
  );
}

export default App;
