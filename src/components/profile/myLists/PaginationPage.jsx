/* eslint-disable react/prop-types */
import React from 'react';
import { Pagination, Icon } from 'semantic-ui-react';

class PaginationPage extends React.Component {
  constructor(props) {
    super(props);
    const { totalRecords = null, pageLimit = 30 } = props;

    this.pageLimit = typeof pageLimit === 'number' ? pageLimit : 30;
    this.totalRecords = typeof totalRecords === 'number' ? totalRecords : 0;

    this.totalPages = Math.ceil(this.totalRecords / this.pageLimit);
  }

  componentDidMount() {
    this.gotoPage(1);
  }

  gotoPage = (page) => {
    const { onPageChanged = f => f } = this.props;

    const currentPage = Math.max(0, Math.min(page, this.totalPages));

    const paginationData = {
      currentPage,
      pageLimit: this.pageLimit,
    };

    onPageChanged(paginationData);
  };

  handleClick = (page) => {
    this.gotoPage(page);
  };

  render() {
    if (!this.totalRecords) return null;

    if (this.totalPages === 1) return null;

    return (
      <Pagination
        defaultActivePage={1}
        firstItem={{ content: <Icon name="angle double left" />, icon: true }}
        lastItem={{ content: <Icon name="angle double right" />, icon: true }}
        siblingRange={1}
        onPageChange={(e, data) => this.handleClick(data.activePage)}
        totalPages={this.totalPages}
      />
    );
  }
}

export default PaginationPage;
