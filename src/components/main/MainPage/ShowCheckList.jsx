import React, { Component } from 'react';
import PropTypes from 'prop-types';
import http from '../../../api/http';
import loaderStyle from '../loader.module.css';
import Header from '../Header';
import styles from './ShowCheckList.module.css';
import Footer from '../Footer';
import MainChecklistBlock from '../../checklist/MainChecklistBlock';
import NotFound404 from '../../utils/404-page';

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
    const slug = match.params.id;

    http.get(`/api/checklists/${slug}`)
      .then((res) => {
        this.setState({
          checkList: res.data,
          loading: false,
        });
      })
      .catch((error) => {
        this.setState({ loading: false });
      });
  }

  render() {
    const { loading, checkList } = this.state;
    if (loading) {
      return (
        <div className={loaderStyle.loader}>Loading...</div>
      );
    } if (!checkList) {
      return <NotFound404 />;
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
