import React from 'react';
import { Grid } from 'semantic-ui-react';
import ChatSideBar from './ChatSideBar';
import Chat from './Chat';
import styles from './css/ChatContainer.module.css';

const ChatContainer = ({ teamId }) => (
  <Grid colums={2} divided className={styles.container}>
    <Grid.Row>
      <Grid.Column className={styles.chatSidebar} width={4}>
        <ChatSideBar teamId={teamId} />
      </Grid.Column>
      <Grid.Column className={styles.chatWindow} width={12}>
        <Chat teamId={teamId} />
      </Grid.Column>
    </Grid.Row>
  </Grid>
);

export default ChatContainer;
