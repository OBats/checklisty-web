import React, { Component } from 'react';
import { Progress, Segment } from 'semantic-ui-react';
import style from './css/MainChecklistBlock.module.css';
import ChecklistViewLogic from './checklist-view/ChecklistViewLogic';

class MainChecklistBlock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      wholeChecklistProgress: 0, amountOfAllCheckboxes: 0, amountOfCheckedCheckboxes: 0,
    };
  }

  componentDidMount() {
    const { sections_data } = this.props.checkListData;
    let amountOfAllCheckboxes = 0;
    for (let i = 0; i < sections_data.length; i += 1) {
      amountOfAllCheckboxes += sections_data[i].items_data.length;
    }
    this.setState({ amountOfAllCheckboxes });
  }

  countProgressOnCheckboxClick = (flag) => {
    const { amountOfCheckedCheckboxes, amountOfAllCheckboxes } = this.state;
    let amountOfCheckedCheckboxesTemp = amountOfCheckedCheckboxes;
    if (flag) {
      amountOfCheckedCheckboxesTemp += 1;
    } else {
      amountOfCheckedCheckboxesTemp -= 1;
    }

    const wholeChecklistProgress = (
      (amountOfCheckedCheckboxesTemp / amountOfAllCheckboxes) * 100).toFixed(0);
    this.setState({
      wholeChecklistProgress, amountOfCheckedCheckboxes: amountOfCheckedCheckboxesTemp,
    });
  }

  countProgressOnAdditionalButton = (difference) => {
    const { amountOfCheckedCheckboxes, amountOfAllCheckboxes } = this.state;
    let amountOfCheckedCheckboxesTemp = amountOfCheckedCheckboxes;
    amountOfCheckedCheckboxesTemp += difference;

    const wholeChecklistProgress = (
      (amountOfCheckedCheckboxesTemp / amountOfAllCheckboxes) * 100).toFixed(0);
    this.setState({
      wholeChecklistProgress, amountOfCheckedCheckboxes: amountOfCheckedCheckboxesTemp,
    });
  }

  render() {
    const { checkListData } = this.props;
    const { amountOfCheckedCheckboxes, amountOfAllCheckboxes, wholeChecklistProgress } = this.state;
    return (
      <div className={style.checklistColumn}>
        {!this.props.hideMainProgressbar && (
          <div className={style.progressBlock}>
            <Segment>
              <p className={style.progressbarHeader}>Progress of the whole checklist:</p>
              <Progress
                value={amountOfCheckedCheckboxes}
                total={amountOfAllCheckboxes}
                indicating
                size="large"
                className={style.progressbar}
              >
                {`${wholeChecklistProgress}% or 
                  ${amountOfCheckedCheckboxes}/${amountOfAllCheckboxes} items`}
              </Progress>
            </Segment>
          </div>
        )}
        {checkListData && checkListData.sections_data.map((elem, index) => (
          <ChecklistViewLogic
            key={index.toString()}
            checklistIndex={index}
            checkListData={elem}
            countProgressOnAdditionalButton={this.countProgressOnAdditionalButton}
            countProgressOnCheckboxClick={this.countProgressOnCheckboxClick}
          />
        ))}
      </div>
    );
  }
}

export default MainChecklistBlock;
