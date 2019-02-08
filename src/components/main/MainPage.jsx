/* eslint-disable linebreak-style */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './MainPage.module.css';
import http from '../../api/http';
import loaderStyle from './loader.module.css';

class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAllCheckList: null,
      loading: true,
    };
  }

  componentDidMount() {
    http.get('/api/checklists/')
      .then((res) => {
        this.setState({
          showAllCheckList: res.data,
          loading: false,
        });
      });
  }

  render() {
    const { showAllCheckList, loading } = this.state;
    if (loading) {
      return (
        <div className={loaderStyle.loader}>Loading...</div>
      );
    }
    return (
      <div>
        <h1> CheckLists </h1>
        <div className={styles.checkListItems}>
          {showAllCheckList && showAllCheckList.map(currentCheckList => (
            <Link
              key={currentCheckList.id}
              to={`/home/${currentCheckList.id}`}
              className={styles.checkListLink}
            >
              { currentCheckList.title }
            </Link>
          ))}
        </div>
      </div>
    );
  }
}

export default MainPage;
