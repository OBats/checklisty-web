import React, { useState, useEffect } from 'react';
import ChecklistViewComponents from './ChecklistViewComponents';

const ChecklistViewLogic = (props) => {
  const data = props.checkListData;
  const [checkboxArray, setCheckboxArray] = useState(props.arrayOfArrays);
  const [accordionIndexArray, setAccordionIndexArray] = useState([]);
  const [isWholeChecklistHidden, setIsWholeChecklistHidden] = useState(false);
  const [currentProgress, setCurrentProgress] = useState(0);

  const getProgress = (checkboxArrayTemporal = props.arrayOfArrays) => {
    let countOfCheckedItems = 0;
    for (let i = 0; i < checkboxArrayTemporal.length; i += 1) {
      if (checkboxArrayTemporal[i] === true) {
        countOfCheckedItems += 1;
      }
    }
    const currentProgress = ((countOfCheckedItems / checkboxArrayTemporal.length) * 100).toFixed(0);
    return currentProgress;
  };

  useEffect(() => {
    const accordionIndexArrayTemp = [];
    for (let i = 0; i < data.items_data.length; i += 1) {
      accordionIndexArrayTemp.push(-1);
    }
    const currentProgressTemp = getProgress();
    setCheckboxArray(props.arrayOfArrays);
    setAccordionIndexArray(accordionIndexArrayTemp);
    setCurrentProgress(currentProgressTemp);
  }, []);


  useEffect(() => {
    if (currentProgress !== getProgress()) {
      if (props.updateViewOfComponent) {
        const currentProgressTemp = getProgress();
        props.updateViewOfComponent(props.arrayOfArrays, props.checklistIndex);
        setCheckboxArray(props.arrayOfArrays);
        setCurrentProgress(currentProgressTemp);
      }
    }
  }, [props.arrayOfArrays]);

  const handleChecked = (index) => {
    const checkboxArray = props.arrayOfArrays;
    const checkboxArrayTemporal = [...checkboxArray];
    checkboxArrayTemporal[index] = !checkboxArrayTemporal[index];
    const flag = checkboxArrayTemporal[index];
    const currentProgress = getProgress(checkboxArrayTemporal);
    props.countProgressOnCheckboxClick(flag, index, props.checklistIndex);
    setCheckboxArray(checkboxArrayTemporal);
    setCurrentProgress(currentProgress);
  };

  const handleClickAccordion = (index) => {
    const accordionIndexArrayTemporal = [...accordionIndexArray];
    accordionIndexArrayTemporal[index] = accordionIndexArrayTemporal[index] === 0 ? -1 : 0;
    setAccordionIndexArray(accordionIndexArrayTemporal);
  };

  const handleSetAllCheckboxes = () => {
    const difference = checkboxArray.length - checkboxArray.filter(elem => elem === true).length;
    props.countProgressOnAdditionalButton(difference, props.checklistIndex);
    setCheckboxArray(checkboxArray.map(() => true));
    setCurrentProgress(100);
  };

  const handleResetAllCheckboxes = () => {
    const difference = checkboxArray.filter(elem => elem === false).length - checkboxArray.length;
    props.countProgressOnAdditionalButton(difference, props.checklistIndex);
    setCheckboxArray(checkboxArray.map(() => false));
    setCurrentProgress(0);
  };

  const handleOpenAllAccordions = () => setAccordionIndexArray(accordionIndexArray.map(() => 0));

  const handleCloseAllAccordions = () => setAccordionIndexArray(accordionIndexArray.map(() => -1));

  const handleClickEyeButton = () => setIsWholeChecklistHidden(!isWholeChecklistHidden);

  return (
    <ChecklistViewComponents
      data={data}
      currentProgress={currentProgress}
      isWholeChecklistHidden={isWholeChecklistHidden}
      accordionIndexArray={accordionIndexArray}
      checkboxArray={checkboxArray}
      checklistIndex={props.checklistIndex}
      handleChecked={handleChecked}
      handleClickAccordion={handleClickAccordion}
      handleClickEyeButton={handleClickEyeButton}
      handleOpenAllAccordions={handleOpenAllAccordions}
      handleCloseAllAccordions={handleCloseAllAccordions}
      handleSetAllCheckboxes={handleSetAllCheckboxes}
      handleResetAllCheckboxes={handleResetAllCheckboxes}
    />
  );
};

export default ChecklistViewLogic;
