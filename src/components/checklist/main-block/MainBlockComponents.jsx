import React from 'react';
import { Progress, Segment } from 'semantic-ui-react';
import { connect } from 'react-redux';
import style from '../css/MainChecklistBlock.module.css';
import ChecklistViewLogic from '../checklist-view/ChecklistViewLogic';
import loaderStyle from '../../main/loader.module.css';
import PortalExampleControlled from './Message';

const MainBlockComponents = (props) => {
  const {
    checkListData,
    amountOfCheckedCheckboxes,
    amountOfAllCheckboxes,
    wholeChecklistProgress,
    updateViewOfComponent,
  } = props;

  const currentProgress = props.loggedUser ? props.currentProgress : wholeChecklistProgress;
  const amountOfCheckedItems = props.loggedUser
    ? props.amountOfCheckedItems : amountOfCheckedCheckboxes;

  if (!props.readyToShow) {
    return (
      <div className={loaderStyle.loader}>
        {'Loading...'}
      </div>
    );
  }
  return (
    <div className={style.checklistColumn}>
      {!props.hideMainProgressbar && (
        <div className={style.progressBlock}>
          <Segment>
            <p className={style.progressbarHeader}>Progress of the whole checklist:</p>
            <Progress
              percent={currentProgress}
              indicating
              size="large"
              className={style.progressbar}
            >
              {!props.loggedUser && <PortalExampleControlled property={props.userClicked} />}
              {`${currentProgress}% or 
                  ${amountOfCheckedItems}/${amountOfAllCheckboxes} items`}
            </Progress>
          </Segment>
        </div>
      )}
      {(checkListData && props.arrayOfCheckboxArray.length > 0) && checkListData.sections_data.map(
        (elem, index) => (
          <ChecklistViewLogic
            key={index.toString()}
            checklistIndex={index}
            checkListData={elem}
            arrayOfArrays={props.arrayOfCheckboxArray[index]}
            countProgressOnAdditionalButton={props.countProgressOnAdditionalButton}
            countProgressOnCheckboxClick={props.countProgressOnCheckboxClick}
            updateViewOfComponent={updateViewOfComponent}
          />
        ),
      )}
    </div>
  );
};

const mapStateToProps = ({ user, progressbar }) => ({
  userData: user.userData,
  loggedUser: user.loggedUser,
  currentProgress: progressbar.progress.currentProgress,
  amountOfCheckedItems: progressbar.progress.amountOfCheckedItems,
});

export default connect(mapStateToProps)(MainBlockComponents);
