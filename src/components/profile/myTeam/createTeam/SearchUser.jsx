import React, { useState } from 'react';
import { Icon } from 'semantic-ui-react';
import { debounce } from 'throttle-debounce';
import { connect } from 'react-redux';
import http from '../../../../api/http';
import { addSelectedUser, changeSuggestionState } from '../../../../actions/selectUserAction';
import SuggestionSearch from './Suggestion';
import styles from './createModal.module.css';


const getUsers = (setState, searchUsersValue, changeState) => {
  http.get(`api/team/searchUsers/searchUsers=${searchUsersValue}`)
    .then((res) => {
      setState(res.data);
      changeState(true);
    });
};

const SearchUser = (props) => {
  const { changeSuggestionState } = props;
  const [data, setData] = useState(null);

  const onChangeUser = debounce(500, (text) => {
    if (text === '') {
      changeSuggestionState(false);
      return false;
    }
    getUsers(setData, text, changeSuggestionState);
  });

  return (
    <div className={styles.findMembersContainer}>
      <h2>Find your team mates</h2>
      <div className={styles.searchContainer}>
        <input placeholder="Search for mebmers..." className={styles.searchUserInput} onChange={e => onChangeUser(e.target.value)} />
        <div className={styles.searchIcon}>
          <Icon name="search" size="large" />
        </div>
      </div>
      <SuggestionSearch data={data} />
    </div>
  );
};

const mapStateToProps = ({ selectedUsers }) => (
  {
    arrayOfSelectedUsers: selectedUsers.arrayOfSelectedUsers,
    showSuggestion: selectedUsers.showSuggestion,
    searchUserValue: selectedUsers.searchUserValue,
  });

const mapDispatchToProps = dispatch => ({
  addSelectedUser: (arrayOfSelectedUsers) => {
    dispatch(addSelectedUser(arrayOfSelectedUsers));
  },
  changeSuggestionState: (showSuggestion) => {
    dispatch(changeSuggestionState(showSuggestion));
  },

});

export default connect(mapStateToProps, mapDispatchToProps)(SearchUser);
