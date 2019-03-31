import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import io from 'socket.io-client';
import Textarea from 'react-textarea-autosize';
import http from '../../../../api/http';
import { ErrorHandling } from '../../../toasters/MessagesHandling';
import loaderStyle from '../../../main/loader.module.css';
import styles from './Chat.module.css';

const baseURL = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_URL : 'http://localhost:3030';

let socket;
let timeout;

const stopShowTypedUser = (cb) => {
  clearTimeout(timeout);
  timeout = setTimeout(cb, 2000);
};

const Chat = ({ userData, teamId }) => {
  const [isLoading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [messagesInfo, setMessagesInfo] = useState([]);
  const [typedUser, setTypedUser] = useState('');

  const { username, image: avatar } = userData;

  useEffect(() => {
    http.get(`api/team/chat/${teamId}`)
      .then((res) => {
        const { data } = res;
        setMessagesInfo(data);
        setLoading(false);
      })
      .catch((error) => {
        if (error.response) {
          ErrorHandling(error.response.data.message);
        } else {
          ErrorHandling('Server is down. Please try again later.');
        }
      });

    socket = io.connect(baseURL);

    socket.on('connect', () => {
      socket.emit('joinRoom', teamId);
    });

    socket.on('message', (messageData) => {
      setMessagesInfo(prevState => ([...prevState, messageData]));
    });

    socket.on('typing', (user) => {
      setTypedUser(user);
    });

    return () => socket.disconnect();
  }, []);

  const removeTypingMsg = () => {
    socket.emit('typing', false);
  };

  const onSendClick = () => {
    socket.emit('message', ({
      username,
      avatar,
      message,
      teamId,
    }));
    removeTypingMsg();
    setMessage('');
  };

  const onMsgChange = (evt) => {
    setMessage(evt.target.value);
    socket.emit('typing', (username));
    stopShowTypedUser(removeTypingMsg);
  };

  return (
    <div className={styles.teamChat}>
      <h2>Checklisty Chat</h2>
      <div className={styles.chatContainer}>
        <div className={styles.output}>
          {isLoading && (
            <div className={loaderStyle.loader}>Loading...</div>
          )}
          {messagesInfo.length > 0 && (
            messagesInfo.map(messageInfo => (
              <div
                key={Math.random()}
                className={styles.chatMsgItem}
              >
                <img src={messageInfo.avatar} alt="User avatar" width="50" height="50" />
                <p className={styles.chatUser}>{`${messageInfo.username}: `}</p>
                <p className={styles.chatMsg}>{messageInfo.message}</p>
              </div>
            ))
          )}
        </div>
        <div className={styles.feedback}>
          {typedUser && (
            <p><em>{`${typedUser} is typing...`}</em></p>
          )}
        </div>
      </div>
      <Textarea
        className={styles.input}
        minRows={2}
        placeholder="Message..."
        value={message}
        onChange={onMsgChange}
      />
      <button
        className={styles.button}
        type="submit"
        onClick={onSendClick}
      >
        Send
      </button>
    </div>
  );
};

const mapStateToProps = ({ user }) => ({
  userData: user.userData,
});

Chat.propTypes = {
  userData: PropTypes.object.isRequired,
  teamId: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Chat);
