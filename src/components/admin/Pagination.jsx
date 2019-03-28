import React from 'react';
import { Pagination as SemanticPagination, Icon } from 'semantic-ui-react';
import styles from './Pagination.module.css';

const Pagination = ({ activePage, setActivePage, totalPage }) => {
  const handlePaginationChange = (e, { activePage }) => {
    setActivePage(activePage);
  };

  if (!totalPage) {
    return null;
  }

  return (
    <div className={styles.paginationContainer}>
      <SemanticPagination
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
};

export default Pagination;
