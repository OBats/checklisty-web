import React, { useState, useEffect } from 'react';
import { Loader, Image, List, Icon, Popup } from 'semantic-ui-react';
import http from '../../../../api/http';
import avatar from '../../Avatar/avatar.png';
import styles from './css/Chat.module.css';
import InviteMembers from './inviteMember/inviteMembers';

const ChatSideBar = ({ teamId, onlineUsers }) => {
  const [loading, setLoading] = useState(true);
  const [teamMembers, setTeamMembers] = useState(null);

  useEffect(() => {
    http.get(`/api/team/${teamId}/members`)
      .then((res) => {
        setTeamMembers(res.data);
        setLoading(false);
      })
      .catch(() => {
        setTeamMembers(undefined);
        setLoading(false);
      });
  }, [teamId]);

  if (loading) return <Loader>Loading</Loader>;
  if (teamMembers === undefined) return <div>Oops, something went wrong!</div>;

  return (
    <div className={styles.listContainer}>
      <List divided>
        { teamMembers.map(member => (
          <List.Item key={member.id} className={styles.user}>
            <List.Content floated="right" style={{ marginTop: '5px' }}>
              { onlineUsers.includes(member.username)
                ? <Popup trigger={<Icon color="green" name="circle" />} content="Online" />
                : <Popup trigger={<Icon name="circle outline" />} content="Offline" /> }
            </List.Content>
            <Image avatar src={member.image || avatar} />
            <List.Content style={{ marginTop: '5px' }}>
              <List.Header>
                { member.firstName && member.lastName
                  ? `${member.firstName} ${member.lastName}` : member.username }
              </List.Header>
            </List.Content>
          </List.Item>
        ))}
      </List>
      <InviteMembers />
    </div>
  );
};

export default ChatSideBar;
