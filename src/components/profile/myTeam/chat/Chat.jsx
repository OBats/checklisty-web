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
import checkTextAreaValue from './utils/checkTextareaValue';
import loaderStyle from '../../../main/loader.module.css';
import styles from './css/Chat.module.css';

const baseURL = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_URL : 'http://localhost:3030';

const ENTER_KEY = 13;

let textareaValue = '';
let socket;
let typedUserTimeout;
let connectTimeout;
let disConnectTimeout;
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

const Chat = ({ userData, teamId, setOnlineUsers }) => {
  const [isLoading, setLoading] = useState(true);
  const [typingValue, setTypingValue] = useState('');
  const [messagesInfo, setMessagesInfo] = useState([]);
  const [typedUser, setTypedUser] = useState('');
  const [connectedUserNumber, setConnectedUserNumber] = useState(0);
  const [connectedUser, setConnectedUser] = useState('');
  const [disconnectedUser, setDisconnectedUser] = useState('');

  const { username, image: avatar } = userData;

  const scrollToBottom = (transition) => {
    scrollingToElement.scrollIntoView({ behavior: transition });
  };

  const removeTypingMsg = () => {
    socket.emit('typing', false);
  };

  useEffect(() => {
    http.get(`api/team/chat/${teamId}`)
      .then((res) => {
        const { data } = res;

        setMessagesInfo(data);
        scrollToBottom('auto');
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

    socket.on('onlineUsers', (onlineUsers) => {
      setOnlineUsers(onlineUsers);
    });

    socket.on('message', (messageData) => {
      removeTypingMsg();
      setMessagesInfo(prevState => ([...prevState, messageData]));
      scrollToBottom('smooth');
    });

    socket.on('typing', (user) => {
      setTypedUser(user);
    });

    socket.emit('userConnection', username);
    socket.on('userConnection', (user) => {
      setConnectedUser(user);
    });

    socket.on('connectedUserNumber', (number) => {
      setConnectedUserNumber(number);
    });

    socket.on('userDisconnection', (user) => {
      setDisconnectedUser(user);
    });

    socket.on('connect_error', () => {
      ErrorHandling('Something went wrong. Reconnecting...', false);
    });

    socket.on('reconnect', () => {
      toast.dismiss();
    });

    return () => socket.disconnect();
  }, [teamId, username]);

  const removeConnectedUser = () => {
    setConnectedUser('');
  };

  const removeDisConnectedUser = () => {
    setDisconnectedUser('');
  };

  hideConnectedUser(removeConnectedUser);
  hideDisConnectedUser(removeDisConnectedUser);

  const onSendClick = () => {
    const message = checkTextAreaValue(textareaValue);

    if (message) {
      socket.emit('message', ({
        username,
        avatar,
        message,
        teamId,
        createdAt: new Date(),
      }));

      setTypingValue('');
      textareaValue = null;
    }

    scrollToBottom('smooth');
  };

  const onEnterPress = (evt) => {
    if (evt.keyCode === ENTER_KEY && !evt.shiftKey) {
      evt.preventDefault();

      onSendClick();
    }
  };

  const onMsgChange = (evt) => {
    textareaValue = evt.target.value;
    setTypingValue(textareaValue);

    socket.emit('typing', username);
    stopShowTypedUser(removeTypingMsg);
  };

  return (
    <div className={styles.chat}>
      <header className={styles.chatHeader}>
        <h2>Team Chat</h2>
        <div className={styles.headerInfo}>
          <div className={styles.totalMsg} title="Total messages">
            <span><Icon name="wechat" /></span>
            <span>{messagesInfo.length}</span>
          </div>
          <div className={styles.onlineUsers} title="Online users">
            <span><Icon name="user" /></span>
            <span>{connectedUserNumber}</span>
          </div>
        </div>
        <div className={styles.floatStatusBlock}>
          {connectedUser && (
            <span className={`${styles.floatStatus} ${styles.floatStatusConnected}`}>
              {`${connectedUser} has been connected`}
            </span>
          )}
          {disconnectedUser && (
            <span className={`${styles.floatStatus} ${styles.floatStatusDisConnected}`}>
              {`${disconnectedUser} has left the chat`}
            </span>
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
        </div>
      </div>
      <div className={styles.formBlock}>
        <Textarea
          className={styles.chatTextarea}
          minRows={1}
          placeholder="Message..."
          value={typingValue}
          onChange={onMsgChange}
          onKeyDown={onEnterPress}
        />
        <button
          className={styles.sendButton}
          type="submit"
          onClick={onSendClick}
        >
          <Icon name="send" size="large" />
        </button>
      </div>
      <div className={styles.typedUser}>
        {typedUser && (
          <p>
            <span className={styles.typedUserName}>{`${typedUser}`}</span>
            <span>is typing...</span>
          </p>
        )}
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
