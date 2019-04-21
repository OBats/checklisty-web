import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Loader, Popup } from 'semantic-ui-react';
import { connect } from 'react-redux';
import http from '../../../../api/http';
import InviteMembers from './inviteMember/inviteMembers';
import UserInfoPopup from './UserInfoPopup';
import styles from './css/ChatSideBar.module.css';

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

  const users = teamMembers.map((member) => {
    const isOnline = onlineUsers.includes(member.username);

    return (
      <Popup
        key={member.id}
        trigger={(
          <li className={styles.user}>
            <span className={`${styles.userStatus} ${isOnline ? styles.online : styles.offline}`} />
            <p className={styles.userInfo}>{member.username}</p>
          </li>
        )}
        content={<UserInfoPopup member={member} isOnline={isOnline} />}
      />
    );
  });

  return (
    <div className={styles.listContainer}>
      <div>
        <header className={styles.header}>
          <h2>Users</h2>
        </header>
        <ul className={styles.users}>
          {users}
        </ul>
      </div>
      <InviteMembers />
    </div>
  );
};

ChatSideBar.propTypes = {
  teamId: PropTypes.string.isRequired,
  onlineUsers: PropTypes.array.isRequired,
};

const mapStateToProps = ({ chatOnlineUsers }) => ({
  onlineUsers: chatOnlineUsers.onlineUsers,
});

export default connect(mapStateToProps)(ChatSideBar);
