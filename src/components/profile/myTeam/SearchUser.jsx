import React, { useState } from 'react';
import { debounce } from 'throttle-debounce';
import { connect } from 'react-redux';
import http from '../../../api/http';
import { addSelectedUser, changeSuggestionState } from '../../../actions/selectUserAction';
import SuggestionSearch from './Suggestion';
import styles from './createModal.module.css';


const getUsers = (setState, searchUsersValue, changeState, arrayOfUsers) => {
  http.get(`api/myteam/searchUsers=${searchUsersValue}/selectedUsers=${arrayOfUsers}`)
    .then((res) => {
      setState(res.data);
      changeState(true);
    });
};

const SearchUser = (props) => {
  const { changeSuggestionState, arrayOfSelectedUsers } = props;
  const [data, setData] = useState(null);
  const inputText = React.createRef();
  const onChangeUser = debounce(500, (text) => {
    inputText.current.value = text;
    if (inputText.current.value === '') {
      changeSuggestionState(false);
      return false;
    }
    getUsers(setData, text, changeSuggestionState, arrayOfSelectedUsers);
  });

  return (
    <div className={styles.findMembersContainer}>
      <h2>Find yout team mates</h2>
      <input placeholder="Search for mebmers..." className={styles.searchUserInput} onChange={e => onChangeUser(e.target.value)} ref={inputText} />
      <SuggestionSearch data={data} inputText={inputText} />
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

export default connect(mapStateToProps, mapDispatchToProps)(SearchUser);
