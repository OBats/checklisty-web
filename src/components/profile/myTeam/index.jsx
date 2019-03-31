import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import loaderStyle from '../../main/loader.module.css';
import styles from './index.module.css';
import Header from '../../main/Header';
import NoTeam from './NoTeam';
import Pagination from './Pagination';
import SearchBar from './SearchBar';
import SelectItems from './SelectTeams';
import { changeComponentLoading } from '../../../actions/checklistsAction';
import fetchUserTeams from '../../../actions/fetchUserTeams';
import Loader from './Loader';
import ShowUserTeams from './showUserTeams';
import NotFound from '../../main/MainPage/NotFound';
import Footer from '../../main/Footer';


const MyTeam = (props) => {
  const {
    fetchUserTeams,
    teams,
    componentLoader,
    activePage,
    searchTeamValue,
    selectTeams,
    listsLoader,
    teamsAmount,
    history,
  } = props;

  useEffect(() => () => {
    changeComponentLoading(true);
  }, []);

  useEffect(() => {
    fetchUserTeams(activePage, searchTeamValue, selectTeams);
  }, [activePage, searchTeamValue, selectTeams]);

  if (componentLoader) {
    return (
      <div className={loaderStyle.loader}>Loading...</div>
    );
  }
  if (teamsAmount === 0) {
    return (
      <NoTeam />
    );
  }
  if (teams) {
    return (
      <div className={styles.myTeamList}>
        <Header title="My Teams" />
        <div className={styles.myTeamContent}>
          <div className={styles.mainContent}>
            <SearchBar />

            <div className={styles.content}>
              {listsLoader
                ? (
                  <div className={styles.loaderContainer}>
                    <Loader />
                  </div>
                )
                : (
                  <>
                    {teams.length !== 0
                      ? (
                        <>
                          <ShowUserTeams teams={teams} history={history} />
                        </>
                      )
                      : (
                        <div className={styles.notFoundContainer}>
                          <NotFound notFound={searchTeamValue} />
                        </div>
                      )
                    }
                  </>
                )}
            </div>
            {teams.length !== 0
              ? (
                <div className={styles.selectContainer}>
                  <div className={styles.selectTeams}>
                    <SelectItems />
                  </div>
                </div>
              )
              : null}

            {teams.length !== 0
              ? <Pagination />
              : null}
          </div>

        </div>
        <Footer />
      </div>
    );
  }
  return null;
};

const mapStateToProps = ({ checklists, selectedUsers }) => (
  {
    activePage: selectedUsers.activePage,
    searchTeamValue: selectedUsers.searchTeamValue,
    selectTeams: selectedUsers.selectTeams,
    componentLoader: checklists.componentLoader,
    totalPage: selectedUsers.totalPage,
    listsLoader: checklists.listsLoader,
    teams: selectedUsers.teams,
    teamsAmount: selectedUsers.teamsAmount,
  }
);

const mapDispatchToProps = dispatch => ({
  fetchUserTeams: (activePage, searchTeamValue, selectTeams) => {
    dispatch(fetchUserTeams(activePage, searchTeamValue, selectTeams));
  },
  changeComponentLoading: (componentLoader) => {
    dispatch(changeComponentLoading(componentLoader));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(MyTeam);
