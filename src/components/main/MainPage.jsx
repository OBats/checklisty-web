/* eslint-disable linebreak-style */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './MainPage.module.css';
import http from '../../api/http';
import loaderStyle from './loader.module.css';
import logo from '../navbar/logo.png';
import CreateChecklistModal from '../create-checklist/checklist-modal';

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

  countingItems = (checklist) => {
    if (checklist.length === 1) {
      return `${checklist.length} item`;
    }
    return `${checklist.length} items`;
  }

  render() {
    const { showAllCheckList, loading } = this.state;
    if (loading) {
      return (
        <div className={loaderStyle.loader}>Loading...</div>
      );
    }
    return (
      <div className={styles.mainContent}>
        <div className={styles.infoContainer}>
          <div className={styles.checkListItems}>
            {showAllCheckList && showAllCheckList.map(currentCheckList => (
              <Link
                to={`/home/${currentCheckList.id}`}
                className={styles.checkListLink}
                key={currentCheckList.id}
              >
                <div className={styles.imageContainer}>
                  <div>
                    <img src={logo} alt="checklist-logo" />
                  </div>
                </div>
                <div className={styles.checkListInfo}>
                  <div className={styles.titleAndAuthor}>
                    <div className={styles.title}>
                      { currentCheckList.title }
                    </div>
                    <div className={styles.author}>
                      { currentCheckList.author.username}
                    </div>
                  </div>
                  <div className={styles.checkListAmount}>
                    {this.countingItems(currentCheckList.items_data)}
                  </div>
                </div>
              </Link>
            ))}

          </div>
          <div className={styles.modalWindow}>
            <CreateChecklistModal />
          </div>
        </div>
      </div>
    );
  }
}

export default MainPage;
