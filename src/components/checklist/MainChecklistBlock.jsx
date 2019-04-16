import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import http from '../../api/http';
import { saveCurrentProgress } from '../../actions/mainProgressbar';
import MainBlockComponents from './main-block/MainBlockComponents';
import { initArrayOfCheckboxes, countAmountOfCheckedItems } from './main-block/tools';

const MainChecklistBlock = (props) => {
  const [wholeChecklistProgress, setWholeChecklistProgress] = useState(0);
  const [amountOfAllCheckboxes, setAmountOfAllCheckboxes] = useState(0);
  const [amountOfCheckedCheckboxes, setAmountOfCheckedCheckboxes] = useState(0);
  const [arrayOfCheckboxArray, setArrayOfCheckboxArray] = useState([]);
  const [idOfUserChecklistRelation, setIdOfUserChecklistRelation] = useState(null);
  const [readyToShow, setReadyToShow] = useState(false);
  const [userClicked, setUserClicked] = useState(false);

  useEffect(() => {
    const didMounted = async () => {
      const { sections_data } = props.checkListData;
      const { saveCurrentProgress, loggedUser, userData, checkListData } = props;
      let arrayOfCheckboxArray = [];

      if (!loggedUser) {
        arrayOfCheckboxArray = initArrayOfCheckboxes(sections_data);
        const amountOfAllCheckboxes = sections_data.reduce(
          (sum, current) => (sum + current.items_data.length), 0,
        );
        setAmountOfAllCheckboxes(amountOfAllCheckboxes);
        setArrayOfCheckboxArray(arrayOfCheckboxArray);
        setReadyToShow(true);
        setWholeChecklistProgress(0);
      }
      const response = await http.post('/api/checklists/create-users-checklists', {
        userID: userData._id,
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

      setAmountOfAllCheckboxes(amountOfAllCheckboxes);
      setAmountOfCheckedCheckboxes(amountOfCheckedCheckboxes);
      setArrayOfCheckboxArray(arrayOfCheckboxArray);
      setIdOfUserChecklistRelation(response.data._id);
      setReadyToShow(true);
      setWholeChecklistProgress(wholeChecklistProgress);
    };
    didMounted();
  }, []);

  const countProgressOnCheckboxClick = async (flag, indexOfElement, indexOfSection) => {
    const { sections_data } = props.checkListData;
    const { saveCurrentProgress } = props;
    arrayOfCheckboxArray[indexOfSection][indexOfElement] = flag;
    const { wholeChecklistProgress, amountOfCheckedCheckboxes } = countAmountOfCheckedItems(
      sections_data, arrayOfCheckboxArray, amountOfAllCheckboxes, saveCurrentProgress,
    );
    if (props.loggedUser) {
      await http.post('/api/checklists/set-checkbox-data', {
        id: idOfUserChecklistRelation,
        checkboxArray: arrayOfCheckboxArray,
      });
    }

    setAmountOfCheckedCheckboxes(amountOfCheckedCheckboxes);
    setWholeChecklistProgress(wholeChecklistProgress);
    setArrayOfCheckboxArray(arrayOfCheckboxArray);
    setUserClicked(true);
  };

  const countProgressOnAdditionalButton = async (difference, indexOfSection) => {
    const { sections_data } = props.checkListData;
    const { loggedUser, saveCurrentProgress } = props;
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
    setWholeChecklistProgress(wholeChecklistProgress);
    setAmountOfCheckedCheckboxes(amountOfCheckedCheckboxes);
    setArrayOfCheckboxArray(arrayOfCheckboxArray);
    setUserClicked(true);
  };

  return (
    <MainBlockComponents
      arrayOfCheckboxArray={arrayOfCheckboxArray}
      checkListData={props.checkListData}
      amountOfCheckedCheckboxes={amountOfCheckedCheckboxes}
      amountOfAllCheckboxes={amountOfAllCheckboxes}
      wholeChecklistProgress={wholeChecklistProgress}
      readyToShow={readyToShow}
      userClicked={userClicked}
      countProgressOnCheckboxClick={countProgressOnCheckboxClick}
      countProgressOnAdditionalButton={countProgressOnAdditionalButton}
    />
  );
};

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
