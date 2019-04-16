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

class ShowCheckList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      checkList: null,
      loading: true,
      userData: props.user,
      canBeCopied: false,
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
        if (!!this.state.userData.loggedUser
            && this.state.checkList.author === this.state.userData.userData._id) {
          this.setState({ canBeCopied: false });
        } else {
          this.setState({ canBeCopied: true });
        }
      })
      .catch(() => {
        this.setState({ loading: false });
      });
  }

  render() {
    const { loading, checkList, userData, canBeCopied } = this.state;
    if (loading) {
      return (
        <div className={loaderStyle.loader}>Loading...</div>
      );
    } if (!checkList) {
      return <NotFound404 />;
    }
    return (
      <div>
        <Header user={userData.userData} checkList={checkList} canBeCopied={canBeCopied} title={checkList.title} />
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

const mapStateToProps = ({ user }) => ({
  user,
});

export default connect(mapStateToProps)(ShowCheckList);
