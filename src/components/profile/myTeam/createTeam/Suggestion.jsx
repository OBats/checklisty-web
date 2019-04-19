import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import styles from './suggestion.module.css';
import avatar from './User_Avatar.png';
import { addSelectedUser, changeSuggestionState } from '../../../../actions/selectUserAction';


const SuggestionSearch = (props) => {
  const { data, arrayOfSelectedUsers, addSelectedUser, showSuggestion } = props;
  const filteredArr = [];
  const [userData, setData] = useState(null);

  const updateData = () => {
    if (data === null) {
      return null;
    }
    let counter = 0;
    for (let i = 0; i < data.length; i += 1) {
      counter = 0;
      for (let j = 0; j < arrayOfSelectedUsers.length; j += 1) {
        if (data[i]._id === arrayOfSelectedUsers[j]._id) {
          counter += 1;
        }
      }
      if (counter === 0) {
        filteredArr.push(data[i]);
      }
    }
    setData(filteredArr);
  };

  useEffect(() => {
    setData(data);
    updateData();
  }, [arrayOfSelectedUsers, data]);


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

  if (userData === null) {
    return null;
  }
  if (data.length === 0) {
    return (
      <div>
        {showSuggestion
          ? (
            <div className={styles.notFound}>
              <h3>No results found...</h3>
            </div>
          )
          : null}
      </div>

    );
  }
  return (
    <div>
      {showSuggestion
        ? (
          <div className={styles.suggestionContainer}>
            <div className={styles.listOfSuggestion}>
              {userData.map(item => (
                <div key={item._id} className={styles.userContainer}>
                  <div className={styles.currentUser} onClick={e => chosenUser(item)} role="menuitem">
                    <div className={styles.userAvatar}>
                      <img src={item.image === undefined ? avatar : item.image} alt="user avatar" />
                    </div>
                    <div className={styles.userInfo}>
                      <div>
                        <span className={styles.fullName}>
                          {item.firstname && item.lastname ? `${item.firstname} ${item.lastname}` : null}
                        </span>
                      </div>
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
          </div>
        ) : null}
    </div>
  );
};
const mapStateToProps = ({ selectedUsers }) => (
  {
    arrayOfSelectedUsers: selectedUsers.arrayOfSelectedUsers,
    showSuggestion: selectedUsers.showSuggestion,
    animationState: selectedUsers.animationState,

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
