import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Icon, Loader } from 'semantic-ui-react';
import { debounce } from 'throttle-debounce';
import { connect } from 'react-redux';
import styles from './MainPage.module.css';
import http from '../../api/http';
import loaderStyle from './loader.module.css';
import logo from '../navbar/logo.png';
import CreateChecklistModal from '../create-checklist/checklist-modal';
import NotFound from './NotFound';
import PaginationExampleControlled from './Pagination';

class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAllCheckList: null,
      searchFilter: '',
      loading: true,
      totalPage: 1,
      listsLoader: false,
    };
  }

  componentDidMount() {
    this.getAllChecklists();
  }

  componentDidUpdate(prevProps, prevState) {
    const { activePage } = this.props;
    if (activePage !== prevProps.activePage) {
      this.getAllChecklists();
    }
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
    this.setState({
      listsLoader: true,
    });
    const { activePage } = this.props;
    http.get(`api/checklists/page=${activePage}`)
      .then((res) => {
        this.setState({
          showAllCheckList: res.data.result,
          loading: false,
          searchFilter: '',
          totalPage: res.data.totalItems,
          listsLoader: false,
        });
      });
  }

 getSearchedChecklists = (search) => {
   http.get(`/api/checklists/search=${search}`)
     .then((res) => {
       this.setState({
         showAllCheckList: res.data.result,
         searchFilter: search,
         totalPage: res.data.totalItems,
       });
     });
 }

  countingItems = (checklist) => {
    const howMuchItems = checklist.reduce((acc, current) => acc + current.items_data.length, 0);
    const msg = howMuchItems === 1 || howMuchItems === 0 ? `${howMuchItems} item` : `${howMuchItems} items`;
    return msg;
  }

  showCreationData = data => `Created: ${data.slice(0, 10).split('-').reverse().join('/')}`;

  render() {
    const { loading, showAllCheckList, searchFilter, totalPage, listsLoader } = this.state;
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
              { listsLoader ? <div className={styles.loader}><Loader active inline="centered" size="large" content="Loading..." /></div> : (
                <>
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
                </>
              )}
              <div className={styles.modalWindow}>
                {counter !== showAllCheckList.length && !listsLoader
                  ? <CreateChecklistModal /> : false}
              </div>
            </div>
          </div>
        </div>
        {counter !== showAllCheckList.length
          ? <PaginationExampleControlled totalPage={totalPage} /> : false}
      </div>
    );
  }
}

const mapStateToProps = ({ pagination }) => ({
  activePage: pagination.activePage,
});

export default connect(mapStateToProps)(MainPage);
