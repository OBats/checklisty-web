import React from 'react';
import { connect } from 'react-redux';
import styles from './SelectPage.module.css';
import { resetActivePage, saveSelectValue } from '../../../actions/checklistsAction';


function SelectPage(props) {
  const { saveSelectValue, resetActivePage, selectItems } = props;
  const getSelectValue = (value) => {
    resetActivePage();
    saveSelectValue(value);
  };
  return (
    <div className={styles.selectContainer}>
      <span className={styles.perPageText}>Per page:</span>
      <select
        className={styles.select}
        onChange={e => getSelectValue(e.target.value)}
        value={selectItems}
      >
        <option value="5">5</option>
        <option value="15">15</option>
        <option value="25">25</option>
      </select>
    </div>
  );
}

const mapStateToProps = ({ checklists }) => (
  {
    selectItems: checklists.selectItems,
  });

const mapDispatchToProps = dispatch => ({
  saveSelectValue: (selectItems) => {
    dispatch(saveSelectValue(selectItems));
  },
  resetActivePage: () => {
    dispatch(resetActivePage());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SelectPage);
