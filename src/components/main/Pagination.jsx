import React, { Component } from 'react';
import { Grid, Pagination, Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';
import saveActivePage from '../../actions/paginationAction';
import styles from './Pagination.module.css';

class PaginationExampleControlled extends Component {
  state = { totalPage: 1 }

  componentDidMount() {
    this.setState({
      totalPage: this.props.totalPage,
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.totalPage !== this.state.totalPage) {
      this.setState({
        totalPage: nextProps.totalPage,
      });
    }
  }

  handlePaginationChange = (e, { activePage }) => {
    this.props.saveActivePage(activePage);
  }

  render() {
    const { totalPage } = this.state;
    const { activePage } = this.props;

    return (
      <div className={styles.paginationContainer}>
        <Grid.Column>
          <Pagination
            activePage={activePage}
            onPageChange={this.handlePaginationChange}
            totalPages={totalPage}
            nextItem={{ content: <Icon name="angle right" />, icon: true }}
            firstItem={{ content: <Icon name="angle double left" />, icon: true }}
            lastItem={{ content: <Icon name="angle double right" />, icon: true }}
            prevItem={{ content: <Icon name="angle left" />, icon: true }}
            pointing
            secondary
          />
        </Grid.Column>
      </div>
    );
  }
}

const mapStateToProps = ({ pagination }) => ({
  activePage: pagination.activePage,
});

const mapDispatchToProps = dispatch => ({
  saveActivePage: (activePage) => {
    dispatch(saveActivePage(activePage));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(PaginationExampleControlled);
