import React, { Component } from 'react';
import ChecklistViewComponents from './ChecklistViewComponents';

class ChecklistViewLogic extends Component {
  constructor(props) {
    super(props);
    const { checkListData } = this.props;
    this.state = {
      data: checkListData,
      checkboxArray: [],
      accordionIndexArray: [],
      iconNameArray: [],
      isWholeChecklistHidden: false,
      currentProgress: 0,
    };
  }

  componentDidMount() {
    const checkboxArrayTemporal = [];
    const accordionIndexArray = [];
    const iconNameArray = [];
    const { data } = this.state;
    for (let i = 0; i < data.items_data.length; i += 1) {
      checkboxArrayTemporal.push(false);
      accordionIndexArray.push(-1);
      iconNameArray.push('chevron down');
    }
    this.setState({ checkboxArray: checkboxArrayTemporal, accordionIndexArray, iconNameArray });
  }

  componentWillReceiveProps({ checkListData }) {
    this.setState({ data: checkListData });
  }

  handleChecked = (index) => {
    const { checkboxArray } = this.state;
    const checkboxArrayTemporal = [...checkboxArray];
    checkboxArrayTemporal[index] = !checkboxArrayTemporal[index];
    let countOfCheckedItems = 0;

    for (let i = 0; i < checkboxArray.length; i += 1) {
      if (checkboxArrayTemporal[i] === true) {
        countOfCheckedItems += 1;
      }
    }
    const currentProgress = (
      (countOfCheckedItems / checkboxArray.length) * 100
    ).toFixed(0);
    this.setState({ checkboxArray: checkboxArrayTemporal, currentProgress });
  }

  handleClickAccordion = (index) => {
    const { accordionIndexArray, iconNameArray } = this.state;
    const accordionIndexArrayTemporal = [...accordionIndexArray];
    accordionIndexArrayTemporal[index] = accordionIndexArrayTemporal[index] === 0 ? -1 : 0;
    const iconNameArrayTemporal = [...iconNameArray];
    iconNameArrayTemporal[index] = accordionIndexArrayTemporal[index] === 0 ? 'chevron up' : 'chevron down';
    this.setState({
      accordionIndexArray: accordionIndexArrayTemporal,
      iconNameArray: iconNameArrayTemporal,
    });
  }

  handleClickEyeButton = () => {
    const { isWholeChecklistHidden } = this.state;
    this.setState({ isWholeChecklistHidden: !isWholeChecklistHidden });
  }

  handleSetAllCheckboxes = () => {
    this.setState(({ checkboxArray }) => ({
      checkboxArray: checkboxArray.map(() => true),
      currentProgress: 100,
    }));
  }

  handleResetAllCheckboxes = () => {
    this.setState(({ checkboxArray }) => ({
      checkboxArray: checkboxArray.map(() => false),
      currentProgress: 0,
    }));
  }

  handleOpenAllAccordions = () => {
    this.setState(({ accordionIndexArray, iconNameArray }) => ({
      accordionIndexArray: accordionIndexArray.map(() => 0),
      iconNameArray: iconNameArray.map(() => 'chevron up'),
    }));
  }

  handleCloseAllAccordions = () => {
    this.setState(({ accordionIndexArray, iconNameArray }) => ({
      accordionIndexArray: accordionIndexArray.map(() => -1),
      iconNameArray: iconNameArray.map(() => 'chevron down'),
    }));
  }

  render() {
    const {
      data,
      currentProgress,
      isWholeChecklistHidden,
      accordionIndexArray,
      checkboxArray,
      iconNameArray,
    } = this.state;
    const { checklistIndex } = this.props;
    return (
      <ChecklistViewComponents
        data={data}
        currentProgress={currentProgress}
        isWholeChecklistHidden={isWholeChecklistHidden}
        accordionIndexArray={accordionIndexArray}
        checkboxArray={checkboxArray}
        iconNameArray={iconNameArray}
        checklistIndex={checklistIndex}
        handleChecked={this.handleChecked}
        handleClickAccordion={this.handleClickAccordion}
        handleClickEyeButton={this.handleClickEyeButton}
        handleOpenAllAccordions={this.handleOpenAllAccordions}
        handleCloseAllAccordions={this.handleCloseAllAccordions}
        handleSetAllCheckboxes={this.handleSetAllCheckboxes}
        handleResetAllCheckboxes={this.handleResetAllCheckboxes}
      />
    );
  }
}
export default ChecklistViewLogic;
