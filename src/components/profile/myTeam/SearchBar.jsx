import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Icon } from 'semantic-ui-react';
import { debounce } from 'throttle-debounce';
import styles from '../../main/MainPage/MainPage.module.css';
import { saveSearchTeamValue, resetActivePage } from '../../../actions/selectUserAction';
import fetchUserTeams from '../../../actions/fetchUserTeams';
import { changeListsLoading } from '../../../actions/checklistsAction';


function SearchBar(props) {
  const [resetTeamSearch, setResetTeam] = useState(false);
  const textInput = React.createRef();
  const { saveSearchTeamValue, searchTeamValue, activePage, fetchUserTeams, selectTeams, changeListsLoading } = props;

  const onChangeSearch = debounce(500, (text) => {
    changeListsLoading(true);
    if (text === '') {
      saveSearchTeamValue('');
    }
    saveSearchTeamValue(text);
    props.resetActivePage();
  });
  const onKeyPressSearch = debounce(500, (keyPressed) => {
    changeListsLoading(true);
    if (keyPressed === 'Enter') {
      if (searchTeamValue === '') {
        saveSearchTeamValue('');
        fetchUserTeams(activePage, searchTeamValue, selectTeams);
      }

      saveSearchTeamValue(searchTeamValue);
      fetchUserTeams(activePage, searchTeamValue, selectTeams);
    }
  });
  const onClickSearch = () => {
    changeListsLoading(true);
    if (searchTeamValue === '') {
      saveSearchTeamValue('');
      fetchUserTeams(activePage, searchTeamValue, selectTeams);
    }
    saveSearchTeamValue(searchTeamValue);
    fetchUserTeams(activePage, searchTeamValue, selectTeams);
    props.resetActivePage();
  };

  const resetInput = () => {
    props.resetActivePage();
    textInput.current.value = '';
    saveSearchTeamValue('');
    setResetTeam(!resetTeamSearch);
  };
  return (
    <div className={styles.searchBarContainer}>
      <input
        type="text"
        className={[styles.searchInput, styles.searchInputTeam].join(' ')}
        placeholder="Search..."
        onChange={e => onChangeSearch(e.target.value)}
        onKeyPress={e => onKeyPressSearch(e.key)}
        ref={textInput}
      />
      <div className={styles.resetIconContainer}>
        <Icon
          name="close"
          className={[styles.searchIcon, styles.resetIcon].join(' ')}
          size="large"
          onClick={resetInput}
        />
        <Icon
          name="search"
          className={styles.searchIcon}
          size="large"
          onClick={onClickSearch}
        />
      </div>
    </div>
  );
}

const mapStateToProps = ({ selectedUsers, checklists }) => (
  {
    searchTeamValue: selectedUsers.searchTeamValue,
    activePage: selectedUsers.activePage,
    selectTeams: selectedUsers.selectTeams,
  });

const mapDispatchToProps = dispatch => ({
  saveSearchTeamValue: (searchTeamValue) => {
    dispatch(saveSearchTeamValue(searchTeamValue));
  },
  resetActivePage: () => {
    dispatch(resetActivePage());
  },
  fetchUserTeams: (activePage, searchTeamValue, selectTeams) => {
    dispatch(fetchUserTeams(activePage, searchTeamValue, selectTeams));
  },
  changeListsLoading: (listsLoader) => {
    dispatch(changeListsLoading(listsLoader));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
