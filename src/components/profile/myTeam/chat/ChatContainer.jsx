import React, { useState } from 'react';
import { Grid } from 'semantic-ui-react';
import ChatSideBar from './ChatSideBar';
import Chat from './Chat';
import styles from './css/ChatContainer.module.css';

const ChatContainer = ({ teamId }) => {
  const [onlineUsers, setOnlineUsers] = useState(['']);

  return (
    <Grid colums={2} divided className={styles.container}>
      <Grid.Row>
        <Grid.Column className={styles.chatSidebar} width={4}>
          <ChatSideBar teamId={teamId} onlineUsers={onlineUsers} />
        </Grid.Column>
        <Grid.Column className={styles.chatWindow} width={12}>
          <Chat teamId={teamId} setOnlineUsers={setOnlineUsers} />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default ChatContainer;
