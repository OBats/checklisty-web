import React from 'react';
import { connect } from 'react-redux';
import { Icon } from 'semantic-ui-react';
import styles from './SelectedUsers.module.css';
import avatar from './User_Avatar.png';
import { removeSelectedUser } from '../../../../actions/selectUserAction';

const removeUser = (user, arrayOfSelectedUsers, removeSelectedUser) => {
  const removeUser = arrayOfSelectedUsers.filter(currentUser => currentUser._id !== user._id);
  removeSelectedUser(removeUser);
};

const selectedUsers = (props) => {
  const { arrayOfSelectedUsers, removeSelectedUser } = props;

  if (arrayOfSelectedUsers.length === 0) {
    return null;
  }
  return (
    <div className={styles.selectedContainer}>
      <div className={styles.main}>
        <h2>Your future teammates:</h2>
        <div className={styles.invitedContainer}>
          {arrayOfSelectedUsers.map(currentUser => (
            <div key={currentUser._id} className={styles.invitedUser}>
              <div className={styles.userProfile}>
                <div className={styles.userAvatar}>
                  <img src={currentUser.image === undefined ? avatar : currentUser.image} alt="user avatar" />
                </div>
                <div className={styles.userInfo}>
                  <span>
Username:
                    {currentUser.username}
                  </span>
                  <span className={styles.userEmail}>
Email:
                    {currentUser.email}
                  </span>
                </div>
              </div>
              <div
                className={styles.cancelInvite}
                onClick={() => removeUser(currentUser, arrayOfSelectedUsers, removeSelectedUser)}
                role="button"
              >
                <Icon name="cancel" size="large" color="red" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ selectedUsers }) => (
  {
    arrayOfSelectedUsers: selectedUsers.arrayOfSelectedUsers,

  });
const mapDispatchToProps = dispatch => ({
  removeSelectedUser: (arrayOfSelectedUsers) => {
    dispatch(removeSelectedUser(arrayOfSelectedUsers));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(selectedUsers);
