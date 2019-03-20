import React from 'react';
import { Pagination, Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { saveHistoryLoader } from '../../../../actions/historyPagination';
import style from '../css/viewedLists.module.css';

const ViewedListsItemPagination = (
  {
    totalPages,
    activePage,
    saveHistoryLoader,
    handlePaginationChange,
    handleSelectChange,
  },
) => {
  const handlePaginationChanging = (e, { activePage }) => {
    saveHistoryLoader(true);
    handlePaginationChange(activePage);
  };

  const selectHandler = (event) => {
    saveHistoryLoader(true);
    handleSelectChange(event.target.value);
  };

  return (
    <div className={style.paginationWithSelect}>
      <Pagination
        totalPages={totalPages}
        onPageChange={handlePaginationChanging}
        activePage={activePage}
        nextItem={{ content: <Icon name="angle right" />, icon: true }}
        firstItem={{ content: <Icon name="angle double left" />, icon: true }}
        lastItem={{ content: <Icon name="angle double right" />, icon: true }}
        prevItem={{ content: <Icon name="angle left" />, icon: true }}
        pointing
        secondary
      />
      <select onChange={selectHandler} className={style.select}>
        <option value={10}>10</option>
        <option value={20}>20</option>
        <option value={50}>50</option>
      </select>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  saveHistoryLoader: (loaderValue) => {
    dispatch(saveHistoryLoader(loaderValue));
  },
});

export default connect(null, mapDispatchToProps)(ViewedListsItemPagination);
