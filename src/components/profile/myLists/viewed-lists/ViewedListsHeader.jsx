import React from 'react';
import { Segment, Statistic } from 'semantic-ui-react';
import { connect } from 'react-redux';
import style from '../css/viewedLists.module.css';
import http from '../../../../api/http';
import ClearHistoryModal from './ClearHistoryModal';

const ViewedListsHeader = (
  {
    amountOfLists,
    userData,
    getData,
    closeConfirm,
    confirmOpened,
    openConfirm,
  },
) => {
  const countLists = amountOfLists => (`Viewed ${amountOfLists > 1 ? 'lists' : ' list'}`);

  const clearHistory = async () => {
    const url = `/api/checklists/delete-history/userid=${userData._id}`;
    await http.delete(url);
    await getData();
    closeConfirm();
  };

  return (
    <Segment>
      <div className={style.statsBlock}>
        <div className={style.groupStatsSearch}>
          <div className={style.amountBlock}>
            <Statistic>
              <Statistic.Value>{amountOfLists}</Statistic.Value>
              <Statistic.Label>{countLists(amountOfLists)}</Statistic.Label>
            </Statistic>
          </div>
        </div>
        <div className={style.clearHistory}>
          <ClearHistoryModal
            confirmOpened={confirmOpened}
            openConfirm={openConfirm}
            closeConfirm={closeConfirm}
            clearHistory={clearHistory}
          />
        </div>
      </div>
    </Segment>
  );
};

const mapStateToProps = ({ user }) => ({
  userData: user.userData,
});

export default connect(mapStateToProps)(ViewedListsHeader);
