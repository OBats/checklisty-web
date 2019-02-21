import React, { Component } from 'react';
import PropTypes from 'prop-types';
import http from '../../api/http';
import loaderStyle from './loader.module.css';
import Header from './Header';
import styles from './ShowCheckList.module.css';
import Footer from './Footer';
import MainChecklistBlock from '../checklist/MainChecklistBlock';

class ShowCheckList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      checkList: null,
      loading: true,
    };
  }

  componentDidMount() {
    const { match } = this.props;
    const getId = match.params.id;

    http.get(`/api/checklists/${getId}`)
      .then((res) => {
        this.setState({
          checkList: res.data,
          loading: false,
        });
      });
  }

  render() {
    const { loading, checkList } = this.state;
    if (loading) {
      return (
        <div className={loaderStyle.loader}>Loading...</div>
      );
    } if (!checkList) {
      return (
        <div>Check list not found</div>
      );
    }
    return (
      <div>
        <Header title={checkList.title} />
        <div className={styles.checkListContainer}>
          <MainChecklistBlock checkListData={checkList} />
        </div>
        <Footer />
      </div>
    );
  }
}

ShowCheckList.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }).isRequired,
  }).isRequired,
};

export default ShowCheckList;
