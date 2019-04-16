const initArrayOfCheckboxes = (sections_data) => {
  const arrayOfCheckboxArray = [];
  for (let i = 0; i < sections_data.length; i += 1) {
    arrayOfCheckboxArray.push([]);
    for (let j = 0; j < sections_data[i].items_data.length; j += 1) {
      arrayOfCheckboxArray[i].push(false);
    }
  }
  return arrayOfCheckboxArray;
};

const countAmountOfCheckedItems = (
  sections_data, arrayOfCheckboxArray, amountOfAllCheckboxes, saveCurrentProgress,
) => {
  let amountOfCheckedCheckboxesTemp = 0;
  for (let i = 0; i < sections_data.length; i += 1) {
    for (let j = 0; j < sections_data[i].items_data.length; j += 1) {
      if (arrayOfCheckboxArray[i][j] === true) amountOfCheckedCheckboxesTemp += 1;
    }
  }
  const wholeChecklistProgressTemp = ((amountOfCheckedCheckboxesTemp / amountOfAllCheckboxes) * 100)
    .toFixed(0);
  saveCurrentProgress(wholeChecklistProgressTemp, amountOfCheckedCheckboxesTemp);
  return ({ wholeChecklistProgressTemp, amountOfCheckedCheckboxesTemp });
};

export { initArrayOfCheckboxes, countAmountOfCheckedItems };
