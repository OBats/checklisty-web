import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import openSocket from 'socket.io-client';
import http from '../../../api/http';
import { saveCurrentProgress } from '../../../actions/mainProgressbar';
import MainBlockComponents from '../main-block/MainBlockComponents';
import { initArrayOfCheckboxes, countAmountOfCheckedItems } from '../main-block/tools';
import ChecklistTeamHeader from './ChecklistTeamHeader';

const ChecklistTeamBlock = (props) => {
  const [wholeChecklistProgress, setWholeChecklistProgress] = useState(0);
  const [amountOfAllCheckboxes, setAmountOfAllCheckboxes] = useState(0);
  const [amountOfCheckedCheckboxes, setAmountOfCheckedCheckboxes] = useState(0);
  const [arrayOfCheckboxArray, setArrayOfCheckboxArray] = useState([]);
  const [idOfTeamChecklistRelation, setIdOfTeamChecklistRelation] = useState(null);
  const [readyToShow, setReadyToShow] = useState(false);
  const [userClicked, setUserClicked] = useState(false);
  const [messages, setMessages] = useState([]);

  const socket = openSocket(process.env.REACT_APP_URL || 'localhost:3030');

  useEffect(() => {
    const didMounted = async () => {
      const { sections_data } = props.checkListData;
      const { saveCurrentProgress, checkListData, teamId } = props;
      let arrayOfCheckboxArrayTemp = [];
      const response = await http.post('/api/checklists/create-teams-checklists', {
        teamID: teamId || window.location.href.split('/')[5],
        checklistID: checkListData.id,
        checklistData: checkListData.id,
        checkboxes_data: arrayOfCheckboxArrayTemp,
      });
      if (response.data.checkboxes_data.length < 1) {
        arrayOfCheckboxArrayTemp = initArrayOfCheckboxes(sections_data);
      } else {
        arrayOfCheckboxArrayTemp = response.data.checkboxes_data;
      }
      const amountOfAllCheckboxesTemp = sections_data.reduce((
        sum, current,
      ) => (sum + current.items_data.length), 0);

      const { wholeChecklistProgressTemp, amountOfCheckedCheckboxesTemp } = countAmountOfCheckedItems(
        sections_data, arrayOfCheckboxArrayTemp, amountOfAllCheckboxesTemp, saveCurrentProgress,
      );

      socket.on('emit-data', (data) => {
        const { messages, arrayOfCheckboxArray, checklistID } = data;
        if (checklistID === props.checkListData.id) {
          setMessages(messages);
          setArrayOfCheckboxArray(arrayOfCheckboxArray);
        }
      });

      setAmountOfAllCheckboxes(amountOfAllCheckboxesTemp);
      setAmountOfCheckedCheckboxes(amountOfCheckedCheckboxesTemp);
      setArrayOfCheckboxArray(arrayOfCheckboxArrayTemp);
      setIdOfTeamChecklistRelation(response.data._id);
      setReadyToShow(true);
      setWholeChecklistProgress(wholeChecklistProgressTemp);
      setMessages(response.data.teamLog || []);
    };
    didMounted();

    return () => socket.disconnect();
  }, []);

  const countProgressOnCheckboxClick = async (flag, indexOfElement, indexOfSection) => {
    const { sections_data } = props.checkListData;
    const { saveCurrentProgress } = props;
    const arrayOfCheckboxArrayTemp = [...arrayOfCheckboxArray];
    arrayOfCheckboxArrayTemp[indexOfSection][indexOfElement] = flag;
    const { wholeChecklistProgressTemp, amountOfCheckedCheckboxesTemp } = countAmountOfCheckedItems(
      sections_data, arrayOfCheckboxArrayTemp, amountOfAllCheckboxes, saveCurrentProgress,
    );
    const messagesTemp = [...messages];
    messagesTemp.unshift({
      userData: props.userData,
      itemValue: flag,
      title: sections_data[indexOfSection].items_data[indexOfElement].item_title,
      sectionTitle: sections_data[indexOfSection].section_title,
      forSection: false,
      date: new Date(),
      checklistData: { sectionIndex: indexOfSection, elementIndex: indexOfElement },
    });
    socket.emit('handle-checklist-change', {
      id: idOfTeamChecklistRelation,
      checklistID: props.checkListData.id,
      messages: messagesTemp,
      arrayOfCheckboxArray: arrayOfCheckboxArrayTemp,
      userData: props.userData,
      checklistData: { sectionIndex: indexOfSection, elementIndex: indexOfElement, value: flag, sectionValue: null },
    });
    setAmountOfCheckedCheckboxes(amountOfCheckedCheckboxesTemp);
    setWholeChecklistProgress(wholeChecklistProgressTemp);
    setArrayOfCheckboxArray(arrayOfCheckboxArrayTemp);
    setUserClicked(true);
  };

  const countProgressOnAdditionalButton = async (difference, indexOfSection) => {
    const { sections_data } = props.checkListData;
    const { saveCurrentProgress } = props;
    const arrayOfCheckboxArrayTemp = [...arrayOfCheckboxArray];
    let valueForWholeSection;

    if (difference > 0) valueForWholeSection = true;
    if (difference < 0) valueForWholeSection = false;
    if (difference !== 0) {
      arrayOfCheckboxArrayTemp[indexOfSection] = arrayOfCheckboxArrayTemp[indexOfSection]
        .map(() => valueForWholeSection);
    }
    const { wholeChecklistProgressTemp, amountOfCheckedCheckboxesTemp } = countAmountOfCheckedItems(
      sections_data, arrayOfCheckboxArrayTemp, amountOfAllCheckboxes, saveCurrentProgress,
    );
    const messagesTemp = [...messages];
    messagesTemp.unshift({
      userData: props.userData,
      itemValue: valueForWholeSection,
      sectionTitle: sections_data[indexOfSection].section_title,
      forSection: true,
      date: new Date(),
      checklistData: { sectionIndex: indexOfSection },
    });
    socket.emit('handle-checklist-change', {
      id: idOfTeamChecklistRelation,
      checklistID: props.checkListData.id,
      messages: messagesTemp,
      arrayOfCheckboxArray: arrayOfCheckboxArrayTemp,
      userData: props.userData,
      checklistData: { sectionIndex: indexOfSection, value: null, sectionValue: valueForWholeSection },
    });
    setWholeChecklistProgress(wholeChecklistProgressTemp);
    setAmountOfCheckedCheckboxes(amountOfCheckedCheckboxesTemp);
    setArrayOfCheckboxArray(arrayOfCheckboxArrayTemp);
    setUserClicked(true);
  };

  const updateViewOfComponent = (checkboxArray, sectionIndex) => {
    const { sections_data } = props.checkListData;
    const { saveCurrentProgress } = props;
    const arrayOfCheckboxArrayTemp = [...arrayOfCheckboxArray];
    arrayOfCheckboxArrayTemp[sectionIndex] = checkboxArray;
    const { wholeChecklistProgressTemp, amountOfCheckedCheckboxesTemp } = countAmountOfCheckedItems(
      sections_data, arrayOfCheckboxArrayTemp, amountOfAllCheckboxes, saveCurrentProgress,
    );
    setWholeChecklistProgress(wholeChecklistProgressTemp);
    setAmountOfCheckedCheckboxes(amountOfCheckedCheckboxesTemp);
    setArrayOfCheckboxArray(arrayOfCheckboxArrayTemp);
    setUserClicked(true);
  };

  if (arrayOfCheckboxArray) {
    return (
      <React.Fragment>
        <ChecklistTeamHeader messages={messages} />
        <MainBlockComponents
          hideMainProgressbar={props.hideMainProgressbar}
          arrayOfCheckboxArray={arrayOfCheckboxArray}
          checkListData={props.checkListData}
          amountOfCheckedCheckboxes={amountOfCheckedCheckboxes}
          amountOfAllCheckboxes={amountOfAllCheckboxes}
          wholeChecklistProgress={wholeChecklistProgress}
          readyToShow={readyToShow}
          userClicked={userClicked}
          countProgressOnCheckboxClick={countProgressOnCheckboxClick}
          countProgressOnAdditionalButton={countProgressOnAdditionalButton}
          updateViewOfComponent={updateViewOfComponent}
        />
      </React.Fragment>
    );
  }
  return null;
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

export default connect(mapStateToProps, mapDispatchToProps)(ChecklistTeamBlock);
