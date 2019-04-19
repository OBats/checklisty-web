import React from 'react';
import { connect } from 'react-redux';
import { Icon } from 'semantic-ui-react';
import styles from './SelectedUsers.module.css';

const selectedUsers = (props) => {
  const { arrayOfSelectedUsers } = props;
  return (
    <div className={styles.container}>
      <h2>Your future team mates:</h2>
      <div className={styles.invitedContainer}>
        {arrayOfSelectedUsers.map(currentUser => (
          <div key={currentUser._id} className={styles.invitedUser}>
            <div className={styles.userProfile}>
              <div className={styles.userAvatar}>
                <img src={currentUser.image} alt="user avatar" />
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
            <div className={styles.cancelInvite}>
              <Icon name="cancel" size="large" color="red" />
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

const mapStateToProps = ({ selectedUsers }) => (
  {
    arrayOfSelectedUsers: selectedUsers.arrayOfSelectedUsers,
  });

export default connect(mapStateToProps)(selectedUsers);
