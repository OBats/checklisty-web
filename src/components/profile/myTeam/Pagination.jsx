import React from 'react';
import { Pagination, Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { saveActivePage, resetActivePage, changeTotalPageValue } from '../../../actions/selectUserAction';
import styles from '../../main/MainPage/Pagination.module.css';

function PaginationControlled(props) {
  const { activePage, totalPage } = props;
  const handlePaginationChange = (e, { activePage }) => {
    props.saveActivePage(activePage);
  };
  if (isNaN(totalPage)) {
    return null;
  }
  return (
    <div className={styles.paginationContainer}>
      <Pagination
        activePage={activePage}
        onPageChange={handlePaginationChange}
        totalPages={totalPage}
        nextItem={{ content: <Icon name="angle right" />, icon: true }}
        firstItem={{ content: <Icon name="angle double left" />, icon: true }}
        lastItem={{ content: <Icon name="angle double right" />, icon: true }}
        prevItem={{ content: <Icon name="angle left" />, icon: true }}
        pointing
        secondary
      />
    </div>
  );
}

const mapStateToProps = ({ selectedUsers }) => ({
  activePage: selectedUsers.activePage,
  totalPage: selectedUsers.totalPage,
});

const mapDispatchToProps = dispatch => ({
  saveActivePage: (activePage) => {
    dispatch(saveActivePage(activePage));
  },
  resetActivePage: () => {
    dispatch(resetActivePage());
  },
  changeTotalPageValue: (totalPage) => {
    dispatch(changeTotalPageValue(totalPage));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(PaginationControlled);
