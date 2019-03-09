import React from 'react';
import style from './css/MainChecklistBlock.module.css';
import ChecklistViewLogic from './checklist-view/ChecklistViewLogic';

const MainChecklistBlock = ({ checkListData }) => (
  <div className={style.checklistColumn}>
    {checkListData && checkListData.sections_data.map((elem, index) => (
      <ChecklistViewLogic
        key={index.toString()}
        checklistIndex={index}
        checkListData={elem}
      />
    ))}
  </div>
);

export default MainChecklistBlock;
