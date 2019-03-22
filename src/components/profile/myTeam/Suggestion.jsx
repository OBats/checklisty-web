import React from 'react';
import { connect } from 'react-redux';
import styles from './suggestion.module.css';
import { addSelectedUser, changeSuggestionState } from '../../../actions/selectUserAction';


const SuggestionSearch = (props) => {
  const { data, arrayOfSelectedUsers, addSelectedUser, showSuggestion } = props;


  if (data === null) {
    return null;
  }
  const chosenUser = (user) => {
    if (arrayOfSelectedUsers.length === 0) {
      addSelectedUser([...arrayOfSelectedUsers, user]);
      return null;
    }
    if (arrayOfSelectedUsers.length) {
      let counter = 0;
      for (let i = 0; i < arrayOfSelectedUsers.length; i += 1) {
        if (arrayOfSelectedUsers[i]._id.includes(user._id)) {
          counter += 1;
        }
      }
      if (counter === 0) {
        addSelectedUser([...arrayOfSelectedUsers, user]);
      }
    }
  };

  return (
    <div className={styles.suggestionContainer}>
      {showSuggestion
        ? (
          <div className={styles.listOfSuggestion}>
            {data.map(item => (
              <div key={item._id} className={styles.userContainer}>
                <div className={styles.currentUser} onClick={e => chosenUser(item)} role="menuitem">
                  <div className={styles.userAvatar}>
                    <img src={item.image} alt="user avatar" />
                  </div>
                  <div className={styles.userInfo}>
                    <span>
Username:
                      {item.username}
                    </span>
                    <span className={styles.userEmail}>
Email:
                      {item.email}
                    </span>
                  </div>
                </div>

              </div>
            ))}
          </div>
        ) : null}
    </div>
  );
};
const mapStateToProps = ({ selectedUsers }) => (
  {
    arrayOfSelectedUsers: selectedUsers.arrayOfSelectedUsers,
    showSuggestion: selectedUsers.showSuggestion,
  });

const mapDispatchToProps = dispatch => ({
  addSelectedUser: (arrayOfSelectedUsers) => {
    dispatch(addSelectedUser(arrayOfSelectedUsers));
  },
  changeSuggestionState: (showSuggestion) => {
    dispatch(changeSuggestionState(showSuggestion));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SuggestionSearch);
