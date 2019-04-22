import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import io from 'socket.io-client';
import { toast } from 'react-toastify';
import chatOnlineUsers from '../../../../actions/chatOnlineUsers';
import http from '../../../../api/http';
import { ErrorHandling } from '../../../toasters/MessagesHandling';
import checkTextAreaValue from './utils/checkTextareaValue';
import ChatView from './ChatView';

const baseURL = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_URL : 'http://localhost:3030';

const ENTER_KEY = 13;

let textareaValue = '';
let socket;
let typedUserTimeout;
let connectTimeout;
let disConnectTimeout;
let scrollingToElement;

const setScrollingToElement = (el) => {
  scrollingToElement = el;
};

const scrollToBottom = (transition) => {
  scrollingToElement.scrollIntoView({ behavior: transition });
};

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

const Chat = ({ userData, teamId, setChatOnlineUsers }) => {
  const [isLoading, setLoading] = useState(true);
  const [typingValue, setTypingValue] = useState('');
  const [messagesInfo, setMessagesInfo] = useState([]);
  const [typedUser, setTypedUser] = useState('');
  const [connectedUserNumber, setConnectedUserNumber] = useState(0);
  const [connectedUser, setConnectedUser] = useState('');
  const [disconnectedUser, setDisconnectedUser] = useState('');

  const { username, image: avatar } = userData;

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
      setChatOnlineUsers(onlineUsers);
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
  }, []);

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
    <ChatView
      messagesInfo={messagesInfo}
      connectedUserNumber={connectedUserNumber}
      connectedUser={connectedUser}
      disconnectedUser={disconnectedUser}
      isLoading={isLoading}
      typingValue={typingValue}
      onMsgChange={onMsgChange}
      onEnterPress={onEnterPress}
      onSendClick={onSendClick}
      typedUser={typedUser}
      setScrollingToElement={setScrollingToElement}
    />
  );
};

const mapStateToProps = ({ user }) => ({
  userData: user.userData,
});

const mapDispatchToProps = dispatch => ({
  setChatOnlineUsers: (onlineUsers) => {
    dispatch(chatOnlineUsers(onlineUsers));
  },
});

Chat.propTypes = {
  userData: PropTypes.object.isRequired,
  teamId: PropTypes.string.isRequired,
  setChatOnlineUsers: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
