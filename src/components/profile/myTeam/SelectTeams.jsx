import React from 'react';
import { connect } from 'react-redux';
import styles from '../../main/MainPage/SelectPage.module.css';
import { resetActivePage, saveTeamsAmount } from '../../../actions/selectUserAction';


function SelectPage(props) {
  const { saveTeamsAmount, resetActivePage, selectTeams } = props;
  const getSelectValue = (value) => {
    resetActivePage();
    saveTeamsAmount(value);
  };
  return (
    <div className={styles.selectContainer}>
      <span className={styles.perPageText}>Per page:</span>
      <select
        className={styles.select}
        onChange={e => getSelectValue(e.target.value)}
        value={selectTeams}
      >
        <option value="5">5</option>
        <option value="15">15</option>
        <option value="25">25</option>
      </select>
    </div>
  );
}

const mapStateToProps = ({ selectedUsers }) => (
  {
    selectTeams: selectedUsers.selectTeams,
  });

const mapDispatchToProps = dispatch => ({
  saveTeamsAmount: (selectItems) => {
    dispatch(saveTeamsAmount(selectItems));
  },
  resetActivePage: () => {
    dispatch(resetActivePage());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SelectPage);
