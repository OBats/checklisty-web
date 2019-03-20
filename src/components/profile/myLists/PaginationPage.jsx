/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { Pagination, Icon } from 'semantic-ui-react';

const PaginationPage = ({ totalPages, changePage, setCurrentPage }) => {
  const handleClick = (page) => {
    setCurrentPage(page);
    changePage(page);
  };

  useEffect(() => {
    changePage(1);
  }, [1]);

  if (totalPages === 1) return null;

  return (
    <Pagination
      secondary
      pointing
      defaultActivePage={1}
      firstItem={{ content: <Icon name="angle double left" />, icon: true }}
      lastItem={{ content: <Icon name="angle double right" />, icon: true }}
      prevItem={{ content: <Icon name="angle left" />, icon: true }}
      nextItem={{ content: <Icon name="angle right" />, icon: true }}
      siblingRange={1}
      onPageChange={(e, data) => handleClick(data.activePage)}
      totalPages={totalPages}
    />
  );
};

export default PaginationPage;
