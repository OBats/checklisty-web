import React, { useState } from 'react';
import { Icon } from 'semantic-ui-react';
import { debounce } from 'throttle-debounce';
import { connect } from 'react-redux';
import styles from './MainPage.module.css';
import { resetActivePage, saveSearchValue, changeListsLoading } from '../../../actions/checklistsAction';
import fetchData from '../../../actions/fetchData';

function SearchBar(props) {
  const [isReset, setReset] = useState(false);
  const textInput = React.createRef();
  const { saveSearchValue, searchFilter, activePage, selectItems, fetchData, changeListsLoading } = props;

  const onChangeSearch = debounce(500, (text) => {
    changeListsLoading(true);
    if (text === '') {
      saveSearchValue('');
    }
    saveSearchValue(text);
    props.resetActivePage();
  });
  const onKeyPressSearch = debounce(500, (keyPressed) => {
    changeListsLoading(true);
    if (keyPressed === 'Enter') {
      if (searchFilter === '') {
        saveSearchValue('');
        fetchData(activePage, searchFilter, selectItems);
      }

      saveSearchValue(searchFilter);
      fetchData(activePage, searchFilter, selectItems);
    }
  });
  const onClickSearch = () => {
    changeListsLoading(true);
    if (searchFilter === '') {
      saveSearchValue('');
      fetchData(activePage, searchFilter, selectItems);
    }
    saveSearchValue(searchFilter);
    fetchData(activePage, searchFilter, selectItems);
  };

  const resetInput = () => {
    props.resetActivePage();
    textInput.current.value = '';
    saveSearchValue('');
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
    selectItems: checklists.selectItems,
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
  fetchData: (activePage, searchFilter, selectItems) => {
    dispatch(fetchData(activePage, searchFilter, selectItems));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
