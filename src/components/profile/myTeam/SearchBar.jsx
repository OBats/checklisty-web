import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Icon } from 'semantic-ui-react';
import { debounce } from 'throttle-debounce';
import styles from '../../main/MainPage/MainPage.module.css';
import { saveSearchTeamValue, resetActivePage } from '../../../actions/selectUserAction';


function SearchBar(props) {
  const [resetTeamSearch, setResetTeam] = useState(false);
  const textInput = React.createRef();
  const { saveSearchTeamValue, searchTeamValue } = props;

  const onChangeSearch = debounce(500, (text) => {
    if (text === '') {
      saveSearchTeamValue('');
    }
    saveSearchTeamValue(text);
    props.resetActivePage();
  });
  const onKeyPressSearch = debounce(500, (keyPressed) => {
    if (keyPressed === 'Enter') {
      if (searchTeamValue === '') {
        saveSearchTeamValue('');
      }

      saveSearchTeamValue(searchTeamValue);
    }
  });
  const onClickSearch = () => {
    if (searchTeamValue === '') {
      saveSearchTeamValue('');
    }
    saveSearchTeamValue(searchTeamValue);
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
        className={styles.searchInput}
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

const mapStateToProps = ({ selectedUsers }) => (
  {
    searchTeamValue: selectedUsers.searchTeamValue,
  });

const mapDispatchToProps = dispatch => ({
  saveSearchTeamValue: (searchTeamValue) => {
    dispatch(saveSearchTeamValue(searchTeamValue));
  },
  resetActivePage: () => {
    dispatch(resetActivePage());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
