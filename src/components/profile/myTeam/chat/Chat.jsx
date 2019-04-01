import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import io from 'socket.io-client';
import Textarea from 'react-textarea-autosize';
import { toast } from 'react-toastify';
import { Icon } from 'semantic-ui-react';
import timeChecker from '../../../checklist/team-checklist/functions';
import http from '../../../../api/http';
import { ErrorHandling } from '../../../toasters/MessagesHandling';
import loaderStyle from '../../../main/loader.module.css';
import styles from './css/Chat.module.css';

const baseURL = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_URL : 'http://localhost:3030';

const enterKey = 13;
let socket;
let typedUserTimeout;
let connectTimeout;
let disConnectTimeout;
let textareaValue;
let scrollingToElement;

const stopShowTypedUser = (cb) => {
  clearTimeout(typedUserTimeout);
  typedUserTimeout = setTimeout(cb, 2000);
};

const hideConnectedUser = (cb) => {
  clearTimeout(connectTimeout);
  connectTimeout = setTimeout(cb, 2000);
};

const hideDisConnectedUser = (cb) => {
  clearTimeout(disConnectTimeout);
  disConnectTimeout = setTimeout(cb, 2000);
};

const Chat = ({ userData, teamId }) => {
  const [isLoading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [messagesInfo, setMessagesInfo] = useState([]);
  const [typedUser, setTypedUser] = useState('');
  const [connectedUser, setConnectedUser] = useState([]);
  const [disconnectedUser, setDisconnectedUser] = useState([]);

  const { username, image: avatar } = userData;

  const scrollToBottom = () => {
    scrollingToElement.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    http.get(`api/team/chat/${teamId}`)
      .then((res) => {
        const { data } = res;
        setMessagesInfo(data);

        if (data.length > 5) {
          scrollToBottom();
        }

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
      socket.emit('joinRoom', { teamId, username });
    });

    socket.on('message', (messageData) => {
      setMessage('');
      setMessagesInfo(prevState => ([...prevState, messageData]));
      scrollToBottom();
    });

    socket.on('typing', (user) => {
      scrollToBottom();
      setTypedUser(user);
    });

    socket.emit('userConnection', username);
    socket.on('userConnection', (user) => {
      setConnectedUser(prevState => ([...prevState, user]));
    });

    socket.on('userDisconnection', (user) => {
      setDisconnectedUser(prevState => ([...prevState, user]));
    });

    socket.on('connect_error', () => {
      ErrorHandling('Something went wrong. Reconnect...', false);
    });

    socket.on('reconnect', () => {
      toast.dismiss();
    });

    return () => socket.disconnect();
  }, []);

  const removeTypingMsg = () => {
    socket.emit('typing', false);
  };

  const removeConnectedUser = () => {
    setConnectedUser('');
  };

  const removeDisConnectedUser = () => {
    setDisconnectedUser('');
  };

  hideConnectedUser(removeConnectedUser);
  hideDisConnectedUser(removeDisConnectedUser);

  const onSendClick = () => {
    scrollToBottom();

    if (!textareaValue) {
      return;
    }

    socket.emit('message', ({
      username,
      avatar,
      message,
      teamId,
      createdAt: new Date(),
    }));

    removeTypingMsg();
    textareaValue = null;
  };

  const onEnterPress = (evt) => {
    if (evt.keyCode === enterKey && !evt.shiftKey) {
      onSendClick();
    }
  };

  const onMsgChange = (evt) => {
    textareaValue = evt.target.value;
    setMessage(textareaValue);

    socket.emit('typing', username);
    stopShowTypedUser(removeTypingMsg);
  };

  return (
    <div className={styles.chat}>
      <header className={styles.chatHeader}>
        <h2>Team Chat</h2>
        <div className={styles.headerInfo}>
          <span><Icon name="wechat" /></span>
          {messagesInfo.length > 0 && (
            <span className={styles.msgNumber}>{messagesInfo.length}</span>
          )}
        </div>
        <div className={styles.floatStatusBlock}>
          {connectedUser && (
            connectedUser.map(user => (
              <span
                className={`${styles.floatStatus} ${styles.floatStatusConnected}`}
                key={Math.random()}
              >
                {`${user} has been connected`}
              </span>
            ))
          )}
          {disconnectedUser && (
            disconnectedUser.map(user => (
              <span
                className={`${styles.floatStatus} ${styles.floatStatusDisConnected}`}
                key={Math.random()}
              >
                {`${user} has left the chat`}
              </span>
            ))
          )}
        </div>
      </header>

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
                <div className={styles.avatarBlock}>
                  <img src={messageInfo.avatar} alt="User avatar" width="50" height="50" />
                </div>

                <div className={styles.msgInfoContainer}>
                  <div className={styles.msgInfo}>
                    <p className={styles.chatUser}>{`${messageInfo.username}`}</p>
                    <p className={styles.msgDate}>{timeChecker(messageInfo.createdAt)}</p>
                  </div>

                  <p className={styles.chatMsg}>{messageInfo.message}</p>
                </div>
              </div>
            ))
          )}
          <div ref={(el) => { scrollingToElement = el; }} />
          {typedUser && (
            <span className={styles.typedUser}><em>{`${typedUser} is typing...`}</em></span>
          )}
        </div>
      </div>
      <div
        className={styles.formBlock}
      >
        <Textarea
          className={styles.chatTextarea}
          minRows={2}
          placeholder="Message..."
          value={message}
          onChange={onMsgChange}
          onKeyDown={onEnterPress}
        />
        <button
          className={styles.sendButton}
          type="submit"
          onClick={onSendClick}
          disabled={!textareaValue}
        >
          <Icon name="send" size="large" />
        </button>
      </div>
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
