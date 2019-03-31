import React, { Component } from 'react';
import { connect } from 'react-redux';
import openSocket from 'socket.io-client';
import http from '../../../api/http';
import { saveCurrentProgress } from '../../../actions/mainProgressbar';
import MainBlockComponents from '../main-block/MainBlockComponents';
import { initArrayOfCheckboxes, countAmountOfCheckedItems } from '../main-block/tools';
import ChecklistTeamHeader from './ChecklistTeamHeader';

class ChecklistTeamBlock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      wholeChecklistProgress: 0,
      amountOfAllCheckboxes: 0,
      amountOfCheckedCheckboxes: 0,
      arrayOfCheckboxArray: [],
      idOfTeamChecklistRelation: null,
      readyToShow: false,
      userClicked: false,
      messages: [],
    };
    this.socket = openSocket(process.env.REACT_APP_URL || 'localhost:3030');
  }

  async componentDidMount() {
    const { sections_data } = this.props.checkListData;
    const { saveCurrentProgress, checkListData, teamId } = this.props;
    let arrayOfCheckboxArray = [];
    const response = await http.post('/api/checklists/create-teams-checklists', {
      teamID: teamId || window.location.href.split('/')[5],
      checklistID: checkListData.id,
      checklistData: checkListData.id,
      checkboxes_data: arrayOfCheckboxArray,
    });
    if (response.data.checkboxes_data.length < 1) {
      arrayOfCheckboxArray = initArrayOfCheckboxes(sections_data);
    } else {
      arrayOfCheckboxArray = response.data.checkboxes_data;
    }
    const amountOfAllCheckboxes = sections_data.reduce((
      sum, current,
    ) => (sum + current.items_data.length), 0);

    const { wholeChecklistProgress, amountOfCheckedCheckboxes } = countAmountOfCheckedItems(
      sections_data, arrayOfCheckboxArray, amountOfAllCheckboxes, saveCurrentProgress,
    );

    this.socket.on('emit-data', (data) => {
      arrayOfCheckboxArray = data.arrayValues;
      const { messages } = data;
      return this.setState({ arrayOfCheckboxArray, messages });
    });

    return this.setState({
      amountOfAllCheckboxes,
      amountOfCheckedCheckboxes,
      arrayOfCheckboxArray,
      idOfTeamChecklistRelation: response.data._id,
      readyToShow: true,
      wholeChecklistProgress,
      messages: response.data.teamLog || [],
    });
  }

  countProgressOnCheckboxClick = async (flag, indexOfElement, indexOfSection) => {
    const { amountOfAllCheckboxes } = this.state;
    const { sections_data } = this.props.checkListData;
    const { saveCurrentProgress } = this.props;
    const arrayOfCheckboxArray = [...this.state.arrayOfCheckboxArray];
    arrayOfCheckboxArray[indexOfSection][indexOfElement] = flag;
    const { wholeChecklistProgress, amountOfCheckedCheckboxes } = countAmountOfCheckedItems(
      sections_data, arrayOfCheckboxArray, amountOfAllCheckboxes, saveCurrentProgress,
    );
    const messages = [...this.state.messages];
    messages.unshift({
      userData: this.props.userData,
      itemValue: flag,
      title: sections_data[indexOfSection].items_data[indexOfElement].item_title,
      sectionTitle: sections_data[indexOfSection].section_title,
      forSection: false,
      date: new Date(),
      checklistData: { sectionIndex: indexOfSection, elementIndex: indexOfElement },
    });
    this.socket.emit('handle-checklist-change', {
      id: this.state.idOfTeamChecklistRelation,
      messages,
      arrayValues: arrayOfCheckboxArray,
      userData: this.props.userData,
      checklistData: {
        sectionIndex: indexOfSection, elementIndex: indexOfElement, value: flag, sectionValue: null,
      },
    });

    this.setState({
      amountOfCheckedCheckboxes, wholeChecklistProgress, arrayOfCheckboxArray, userClicked: true,
    });
  }

  countProgressOnAdditionalButton = async (difference, indexOfSection) => {
    const { amountOfAllCheckboxes } = this.state;
    const { sections_data } = this.props.checkListData;
    const { saveCurrentProgress } = this.props;
    const arrayOfCheckboxArray = [...this.state.arrayOfCheckboxArray];
    let valueForWholeSection;

    if (difference > 0) valueForWholeSection = true;
    if (difference < 0) valueForWholeSection = false;
    if (difference !== 0) {
      arrayOfCheckboxArray[indexOfSection] = arrayOfCheckboxArray[indexOfSection]
        .map(() => valueForWholeSection);
    }
    const { wholeChecklistProgress, amountOfCheckedCheckboxes } = countAmountOfCheckedItems(
      sections_data, arrayOfCheckboxArray, amountOfAllCheckboxes, saveCurrentProgress,
    );
    const messages = [...this.state.messages];
    messages.unshift({
      userData: this.props.userData,
      itemValue: valueForWholeSection,
      sectionTitle: sections_data[indexOfSection].section_title,
      forSection: true,
      date: new Date(),
      checklistData: { sectionIndex: indexOfSection },
    });
    this.socket.emit('handle-checklist-change', {
      id: this.state.idOfTeamChecklistRelation,
      messages,
      arrayValues: arrayOfCheckboxArray,
      userData: this.props.userData,
      checklistData: {
        sectionIndex: indexOfSection, value: null, sectionValue: valueForWholeSection,
      },
    });
    this.setState({
      wholeChecklistProgress, amountOfCheckedCheckboxes, arrayOfCheckboxArray, userClicked: true,
    });
  }

  updateViewOfComponent = (checkboxArray, sectionIndex) => {
    const { amountOfAllCheckboxes } = this.state;
    const { sections_data } = this.props.checkListData;
    const { saveCurrentProgress } = this.props;
    const arrayOfCheckboxArray = [...this.state.arrayOfCheckboxArray];
    arrayOfCheckboxArray[sectionIndex] = checkboxArray;
    const { wholeChecklistProgress, amountOfCheckedCheckboxes } = countAmountOfCheckedItems(
      sections_data, arrayOfCheckboxArray, amountOfAllCheckboxes, saveCurrentProgress,
    );
    this.setState({
      wholeChecklistProgress, amountOfCheckedCheckboxes, arrayOfCheckboxArray, userClicked: true,
    });
  }

  render() {
    if (this.state.arrayOfCheckboxArray) {
      return (
        <React.Fragment>
          <ChecklistTeamHeader messages={this.state.messages} />
          <MainBlockComponents
            hideMainProgressbar={this.props.hideMainProgressbar}
            arrayOfCheckboxArray={this.state.arrayOfCheckboxArray}
            checkListData={this.props.checkListData}
            amountOfCheckedCheckboxes={this.state.amountOfCheckedCheckboxes}
            amountOfAllCheckboxes={this.state.amountOfAllCheckboxes}
            wholeChecklistProgress={this.state.wholeChecklistProgress}
            readyToShow={this.state.readyToShow}
            userClicked={this.state.userClicked}
            countProgressOnCheckboxClick={this.countProgressOnCheckboxClick}
            countProgressOnAdditionalButton={this.countProgressOnAdditionalButton}
            updateViewOfComponent={this.updateViewOfComponent}
          />
        </React.Fragment>
      );
    }
    return null;
  }
}

const mapStateToProps = ({ user }) => ({
  userData: user.userData,
  loggedUser: user.loggedUser,
});
const mapDispatchToProps = dispatch => ({
  saveCurrentProgress: (currentProgress, amountOfCheckedItems) => {
    dispatch(saveCurrentProgress(currentProgress, amountOfCheckedItems));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ChecklistTeamBlock);
