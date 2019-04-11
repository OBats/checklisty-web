/* eslint-disable no-underscore-dangle */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import http from '../../../api/http';
import loaderStyle from '../loader.module.css';
import Header from '../Header';
import styles from './ShowCheckList.module.css';
import Footer from '../Footer';
import MainChecklistBlock from '../../checklist/MainChecklistBlock';
import NotFound404 from '../../utils/404-page';
import CopyList from '../copyChecklist/CopyList';

class ShowCheckList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      checkList: null,
      loading: true,
      userData: props.user,
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
      .catch(() => {
        this.setState({ loading: false });
      });
  }

  canBeCopied = () => {
    if (!this.state.userData.loggedUser) return false;
    if (this.state.checkList.author === this.state.userData.userData._id) return false;
    return true;
  };

  render() {
    const { loading, checkList, userData } = this.state;
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
          {this.canBeCopied() && <CopyList user={userData.userData} checkList={checkList} />}
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

const mapStateToProps = ({ user }) => ({
  user,
});

export default connect(mapStateToProps)(ShowCheckList);
