import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from 'semantic-ui-react';
import { debounce } from 'throttle-debounce';
import styles from './MainPage.module.css';
import http from '../../api/http';
import loaderStyle from './loader.module.css';
import logo from '../navbar/logo.png';
import CreateChecklistModal from '../create-checklist/checklist-modal';
import NotFound from './NotFound';
import Pagination from './Pagination';

class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAllCheckList: null,
      searchFilter: '',
      loading: true,
    };
  }

  componentDidMount() {
    this.getAllChecklists();
  }

  onChangeSearch = debounce(250, (text) => {
    const searchValue = text;
    if (searchValue !== '') {
      this.getSearchedChecklists(searchValue);
    } else {
      this.getAllChecklists();
    }
  });

  onKeyPressSearch = (e) => {
    const searchValue = this.refs.searchValue.value;
    if (e.key === 'Enter') {
      if (searchValue === '') {
        return;
      }
      this.getSearchedChecklists(searchValue);
    }
  }

  onClickSearch = () => {
    const searchValue = this.refs.searchValue.value;
    this.getSearchedChecklists(searchValue);
  }

  resetInput = () => {
    this.refs.searchValue.value = '';
    this.getAllChecklists();
  }

  getAllChecklists = () => {
    http.get('/api/checklists/')
      .then((res) => {
        this.setState({
          showAllCheckList: res.data,
          loading: false,
          searchFilter: '',
        });
      });
  }

 getSearchedChecklists = (search) => {
   http.get(`/api/checklists/search=${search}`)
     .then((res) => {
       this.setState({
         showAllCheckList: res.data,
         searchFilter: search,
       });
     });
 }

  countingItems = (checklist) => {
    const howMuchItems = checklist.reduce((acc, current) => acc + current.items_data.length, 0);
    const msg = howMuchItems === 1 || 0 ? `${howMuchItems} item` : `${howMuchItems} items`;
    return msg;
  }

  showCreationData = data => `Created: ${data.slice(0, 10).split('-').reverse().join('/')}`;

  render() {
    const { loading, showAllCheckList, searchFilter } = this.state;
    const counter = 0;
    if (loading) {
      return (
        <div className={loaderStyle.loader}>Loading...</div>
      );
    }
    return (
      <div className={styles.mainContent}>
        <div className={styles.infoContainer}>
          <div className={styles.searchBarContainer}>
            <input
              type="text"
              className={styles.searchInput}
              placeholder="Search..."
              onChange={e => this.onChangeSearch(e.target.value)}
              onKeyPress={this.onKeyPressSearch}
              ref="searchValue"
              id="searchInput"
            />
            <div className={styles.resetIconContainer}>
              <Icon
                name="close"
                className={[styles.searchIcon, styles.resetIcon].join(' ')}
                size="large"
                ref="resetIcon"
                onClick={this.resetInput}
              />
              <Icon
                name="search"
                className={styles.searchIcon}
                size="large"
                onClick={this.onClickSearch}
                disabled={searchFilter === ''}
              />
            </div>

          </div>
          <div className={styles.checkListItems}>
            <div className={styles.listContainer}>
              {showAllCheckList && showAllCheckList.map(currentCheckList => (
                <Link
                  to={`/checklist/${currentCheckList.slug}`}
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
                        {currentCheckList.title}
                      </div>
                      <div className={styles.author}>
                        {currentCheckList.author === null ? 'User was deleted' : currentCheckList.author.username}
                      </div>
                    </div>
                    <div className={styles.checkListAmount}>
                      <div>
                        {this.countingItems(currentCheckList.sections_data)}
                      </div>
                      <div>
                        {this.showCreationData(currentCheckList.creation_date)}
                      </div>
                    </div>
                  </div>
                </Link>
              ))
              }
              {counter === showAllCheckList.length && <NotFound notFound={searchFilter} />}
              <div className={styles.modalWindow}>
                <CreateChecklistModal />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MainPage;
