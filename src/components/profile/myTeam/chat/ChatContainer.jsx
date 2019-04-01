import React from 'react';
import { Grid } from 'semantic-ui-react';
import ChatSideBar from './ChatSideBar';
import Chat from './Chat';
import styles from './css/ChatContainer.module.css';

const ChatContainer = ({ teamId }) => (
  <Grid colums={2} divided>
    <Grid.Row>
      <Grid.Column width={4}>
        <ChatSideBar teamId={teamId} />
      </Grid.Column>
      <Grid.Column className={styles.block} width={12}>
        <Chat teamId={teamId} />
      </Grid.Column>
    </Grid.Row>
  </Grid>
);

export default ChatContainer;
