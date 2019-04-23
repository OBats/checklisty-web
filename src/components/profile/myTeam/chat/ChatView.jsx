import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Icon } from 'semantic-ui-react';
import Textarea from 'react-textarea-autosize';
import timeChecker from '../../../checklist/team-checklist/functions';
import loaderStyle from '../../../main/loader.module.css';
import avatar from '../../Avatar/avatar.png';
import styles from './css/Chat.module.css';

const ChatView = ({
  messagesInfo,
  connectedUserNumber,
  connectedUser,
  disconnectedUser,
  isLoading,
  typingValue,
  onMsgChange,
  onEnterPress,
  onSendClick,
  typedUser,
  setScrollingToElement,
  teamName,
}) => (
  <div className={styles.chat}>
    <header className={styles.chatHeader}>
      <h2>{teamName.name}</h2>
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
                <img src={messageInfo.avatar || avatar} alt="User avatar" width="50" height="50" />
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
        <div ref={(el) => { setScrollingToElement(el); }} />
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

ChatView.propTypes = {
  messagesInfo: PropTypes.array.isRequired,
  connectedUserNumber: PropTypes.number.isRequired,
  connectedUser: PropTypes.string.isRequired,
  disconnectedUser: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired,
  typingValue: PropTypes.string.isRequired,
  onMsgChange: PropTypes.func.isRequired,
  onEnterPress: PropTypes.func.isRequired,
  onSendClick: PropTypes.func.isRequired,
  typedUser: PropTypes.string.isRequired,
  setScrollingToElement: PropTypes.func.isRequired,
  teamName: PropTypes.object.isRequired,
};

const mapStateToProps = ({ teamName }) => ({
  teamName,
});

export default connect(mapStateToProps)(ChatView);
