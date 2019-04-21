import React from 'react';
import { Button, Modal } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { addSelectedUser } from '../../../../../actions/selectUserAction';
import SelectedUsers from '../../createTeam/SelectedUsers';
import SearchUser from '../../createTeam/SearchUser';
import styles from '../css/ChatSideBar.module.css';
import http from '../../../../../api/http';


const InviteMembers = ({ addSelectedUser, arrayOfSelectedUsers }) => {
  const resetPreviousData = () => {
    addSelectedUser([]);
  };
  const sendInvites = async () => {
    const values = {
      teamId: window.location.href.split('/')[5],
      requested: arrayOfSelectedUsers.map(currentUser => currentUser._id),
    };
    await http.post('/api/team/invite', values);
    window.location.reload();
  };
  return (
    <Modal
      trigger={(
        <Button
          className={styles.inviteMembers}
          onClick={() => resetPreviousData}
        >
Invite members...
        </Button>
      )}
      closeIcon
    >
      <Modal.Content>
        <Modal.Description className={styles.inviteModal}>
          <SearchUser />
          <SelectedUsers />
          <Button color="green" inverted className={styles.inviteMembersBtn} onClick={sendInvites} disabled={arrayOfSelectedUsers.length === 0}>Invite new members...</Button>
        </Modal.Description>
      </Modal.Content>
    </Modal>

  );
};
const mapStateToProps = ({ selectedUsers }) => (
  {
    arrayOfSelectedUsers: selectedUsers.arrayOfSelectedUsers,

  });
const mapDispatchToProps = dispatch => ({
  addSelectedUser: (arrayOfSelectedUsers) => {
    dispatch(addSelectedUser(arrayOfSelectedUsers));
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(InviteMembers);
