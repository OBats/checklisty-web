import React, { Component } from 'react';
import { connect } from 'react-redux';
import http from '../../api/http';
import { saveCurrentProgress } from '../../actions/mainProgressbar';
import MainBlockComponents from './main-block/MainBlockComponents';
import { initArrayOfCheckboxes, countAmountOfCheckedItems } from './main-block/tools';

class MainChecklistBlock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      wholeChecklistProgress: 0,
      amountOfAllCheckboxes: 0,
      amountOfCheckedCheckboxes: 0,
      arrayOfCheckboxArray: [],
      idOfUserChecklistRelation: null,
      readyToShow: false,
      userClicked: false,
    };
  }

  async componentDidMount() {
    const { sections_data } = this.props.checkListData;
    const { saveCurrentProgress, loggedUser, userData, checkListData } = this.props;
    let arrayOfCheckboxArray = [];

    if (!loggedUser) {
      arrayOfCheckboxArray = initArrayOfCheckboxes(sections_data);
      const amountOfAllCheckboxes = sections_data.reduce(
        (sum, current) => (sum + current.items_data.length), 0,
      );
      return this.setState({
        amountOfAllCheckboxes, arrayOfCheckboxArray, readyToShow: true, wholeChecklistProgress: 0,
      });
    }
    const response = await http.post('/api/checklists/create-users-checklists', {
      userID: userData._id,
      checklistID: checkListData.id,
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
    return this.setState({
      amountOfAllCheckboxes,
      amountOfCheckedCheckboxes,
      arrayOfCheckboxArray,
      idOfUserChecklistRelation: response.data._id,
      readyToShow: true,
      wholeChecklistProgress,
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
    if (this.props.loggedUser) {
      await http.post('/api/checklists/set-checkbox-data', {
        id: this.state.idOfUserChecklistRelation,
        checkboxArray: arrayOfCheckboxArray,
      });
    }
    this.setState({
      amountOfCheckedCheckboxes, wholeChecklistProgress, arrayOfCheckboxArray, userClicked: true,
    });
  }

  countProgressOnAdditionalButton = async (difference, indexOfSection) => {
    const { amountOfAllCheckboxes, idOfUserChecklistRelation } = this.state;
    const { sections_data } = this.props.checkListData;
    const { loggedUser, saveCurrentProgress } = this.props;
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
    if (loggedUser) {
      await http.post('/api/checklists/set-checkbox-data', {
        id: idOfUserChecklistRelation,
        checkboxArray: arrayOfCheckboxArray,
      });
    }
    this.setState({
      wholeChecklistProgress, amountOfCheckedCheckboxes, arrayOfCheckboxArray, userClicked: true,
    });
  }

  render() {
    return (
      <MainBlockComponents
        arrayOfCheckboxArray={this.state.arrayOfCheckboxArray}
        checkListData={this.props.checkListData}
        amountOfCheckedCheckboxes={this.state.amountOfCheckedCheckboxes}
        amountOfAllCheckboxes={this.state.amountOfAllCheckboxes}
        wholeChecklistProgress={this.state.wholeChecklistProgress}
        readyToShow={this.state.readyToShow}
        userClicked={this.state.userClicked}
        countProgressOnCheckboxClick={this.countProgressOnCheckboxClick}
        countProgressOnAdditionalButton={this.countProgressOnAdditionalButton}
      />
    );
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

export default connect(mapStateToProps, mapDispatchToProps)(MainChecklistBlock);
