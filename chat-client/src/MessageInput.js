import React, { useState } from 'react';
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'
import './MessageInput.css';

const NewMessage = ({ socket }) => {

  const [value, setValue] = useState('');

  const submitForm = (e) => {
    e.preventDefault();
    socket.emit('message', value);
    setValue('');
  };

  const addEmoji = (e) => {
    let emoji = e.native;
    setValue(value + emoji);
  }

  return (
    <div>
      <form onSubmit={submitForm}>
        <input
          autoFocus
          value={value}
          placeholder="Type your message"
          onChange={(e) => {
            setValue(e.currentTarget.value);
          }}
        />
      </form>
      <br></br>
      <span>
        <Picker onSelect={addEmoji} />
      </span>
    </div>

  );
};

export default NewMessage;