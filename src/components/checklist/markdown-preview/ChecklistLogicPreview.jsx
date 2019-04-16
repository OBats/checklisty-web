import React, { useEffect, useState } from 'react';
import ChecklistViewComponents from '../checklist-view/ChecklistViewComponents';

const ChecklistLogicPreview = (props) => {
  const [checkboxArray, setCheckboxArray] = useState(null);
  const [accordionIndexArray, setAccordionIndexArray] = useState(null);
  const [data, setData] = useState(props.checkListData);
  const [isWholeChecklistHidden, setIsWholeCHecklistHidden] = useState(false);
  const [currentProgress, setCurrentProgress] = useState(0);

  const startInitializing = (onMount, checkListData) => {
    const accordionIndexArray = [];
    const checkboxArray = [];
    for (let i = 0; i < data.items_data.length; i += 1) {
      accordionIndexArray.push(-1);
      checkboxArray.push(false);
    }
    if (onMount) {
      setCheckboxArray(checkboxArray);
      setAccordionIndexArray(accordionIndexArray);
    } else {
      setData(checkListData);
      setCheckboxArray(checkboxArray);
      setAccordionIndexArray(accordionIndexArray);
    }
  };

  useEffect(() => { startInitializing(true); }, []);

  useEffect(() => {
    startInitializing(false, props.checkListData);
  }, [props.checkListData]);

  const handleChecked = (index) => {
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
    setCheckboxArray(checkboxArrayTemporal);
    setCurrentProgress(currentProgress);
  };

  const handleClickAccordion = (index) => {
    const accordionIndexArrayTemporal = [...accordionIndexArray];
    accordionIndexArrayTemporal[index] = accordionIndexArrayTemporal[index] === 0 ? -1 : 0;
    setAccordionIndexArray(accordionIndexArrayTemporal);
  };

  const handleClickEyeButton = () => setIsWholeCHecklistHidden(!isWholeChecklistHidden);

  const handleSetAllCheckboxes = () => {
    setCheckboxArray(checkboxArray.map(() => true));
    setCurrentProgress(100);
  };

  const handleResetAllCheckboxes = () => {
    setCheckboxArray(checkboxArray.map(() => false));
    setCurrentProgress(0);
  };

  const handleOpenAllAccordions = () => setAccordionIndexArray(accordionIndexArray.map(() => 0));

  const handleCloseAllAccordions = () => setAccordionIndexArray(accordionIndexArray.map(() => -1));

  const { checklistIndex } = props;

  if (checkboxArray) {
    return (
      <ChecklistViewComponents
        data={data}
        currentProgress={currentProgress}
        isWholeChecklistHidden={isWholeChecklistHidden}
        accordionIndexArray={accordionIndexArray}
        checkboxArray={checkboxArray}
        checklistIndex={checklistIndex}
        handleChecked={handleChecked}
        handleClickAccordion={handleClickAccordion}
        handleClickEyeButton={handleClickEyeButton}
        handleOpenAllAccordions={handleOpenAllAccordions}
        handleCloseAllAccordions={handleCloseAllAccordions}
        handleSetAllCheckboxes={handleSetAllCheckboxes}
        handleResetAllCheckboxes={handleResetAllCheckboxes}
      />
    );
  } return null;
};

export default ChecklistLogicPreview;
