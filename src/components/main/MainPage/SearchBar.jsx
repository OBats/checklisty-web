import React, { useState } from 'react';
import { Icon } from 'semantic-ui-react';
import { debounce } from 'throttle-debounce';
import { connect } from 'react-redux';
import styles from './MainPage.module.css';
import { resetActivePage, saveSearchValue, changeListsLoading } from '../../../actions/checklistsAction';

function SearchBar(props) {
  const [isReset, setReset] = useState(false);
  const textInput = React.createRef();
  const { saveSearchValue, searchFilter } = props;

  const onChangeSearch = debounce(500, (text) => {
    saveSearchValue(text);
    if (text === '') {
      saveSearchValue(undefined);
    }
    props.resetActivePage();
  });
  const onKeyPressSearch = debounce(500, (keyPressed) => {
    if (keyPressed === 'Enter') {
      if (searchFilter === '') {
        saveSearchValue(undefined);
      }
      saveSearchValue(searchFilter);
    }
  });
  const onClickSearch = () => {
    if (searchFilter === '') {
      saveSearchValue(undefined);
    }
    saveSearchValue(searchFilter);
    props.resetActivePage();
  };

  const resetInput = () => {
    props.resetActivePage();
    textInput.current.value = '';
    saveSearchValue(undefined);
    setReset(!isReset);
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

const mapStateToProps = ({ checklists }) => (
  {
    searchFilter: checklists.searchFilter,
    activePage: checklists.activePage,
    listsLoader: checklists.listsLoader,
  });

const mapDispatchToProps = dispatch => ({
  saveSearchValue: (searchFilter) => {
    dispatch(saveSearchValue(searchFilter));
  },
  changeListsLoading: (listsLoader) => {
    dispatch(changeListsLoading(listsLoader));
  },
  resetActivePage: () => {
    dispatch(resetActivePage());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
