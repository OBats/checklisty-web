import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import styles from './MainPage.module.css';
import loaderStyle from '../loader.module.css';
import CreateChecklistModal from '../../create-checklist/checklist-modal';
import NotFound from './NotFound';
import PaginationControlled from './Pagination';
import ShowListOfCheckList from './ShowListOfCheckList';
import SearchBar from './SearchBar';
import SelectPage from './SelectHowManyCheclists';
import fetchData from '../../../actions/fetchData';
import { changeComponentLoading } from '../../../actions/checklistsAction';

const MainPage = (props) => {
  const {
    activePage,
    selectItems,
    componentLoader,
    searchFilter,
    listsLoader,
    checklists,
    fetchData,
    changeComponentLoading,
  } = props;

  useEffect(() => () => {
    changeComponentLoading(true);
    return () => {
      changeComponentLoading(true);
    };
  }, []);

  useEffect(() => {
    fetchData(activePage, searchFilter, selectItems);
  }, [activePage, searchFilter, selectItems]);

  if (componentLoader) {
    return (
      <div className={loaderStyle.loader}>Loading...</div>
    );
  }

  return (
    <div className={styles.mainContent}>
      <div className={styles.infoContainer}>
        <SearchBar />
        <div className={styles.checkListItems}>
          <div className={styles.listContainer}>
            { listsLoader ? <div className={loaderStyle.loader}>Loading...</div> : (
              <>
                {checklists !== null && checklists.length !== 0
                  ? <ShowListOfCheckList data={checklists} />
                  : <NotFound notFound={searchFilter} />}
              </>
            )}
            <div className={styles.modalWindow}>
              {checklists !== null && checklists.length !== 0 && !listsLoader
                ? <CreateChecklistModal /> : false}
            </div>
          </div>
          <div className={styles.selectItemsContainer}>
            {checklists !== null && checklists.length !== 0 && <SelectPage />}
          </div>
        </div>
        {checklists !== null && checklists.length !== 0
          ? <PaginationControlled searchValue={searchFilter === undefined ? '' : searchFilter} />
          : null}
      </div>
    </div>
  );
};

const mapStateToProps = (
  { checklists },
) => (
  {
    activePage: checklists.activePage,
    searchFilter: checklists.searchFilter,
    selectItems: checklists.selectItems,
    componentLoader: checklists.componentLoader,
    totalPage: checklists.totalPage,
    listsLoader: checklists.listsLoader,
    checklists: checklists.checklists,
  }
);

const mapDispatchToProps = dispatch => ({
  fetchData: (activePage, searchFilter, selectItems) => {
    dispatch(fetchData(activePage, searchFilter, selectItems));
  },
  changeComponentLoading: (componentLoader) => {
    dispatch(changeComponentLoading(componentLoader));
  },
});


export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
