const dateToObject = (inputDate) => {
  const dataOfAction = {};
  dataOfAction.year = inputDate.slice(0, 4);
  dataOfAction.month = inputDate.slice(5, 7);
  dataOfAction.day = inputDate.slice(8, 10);
  dataOfAction.hour = inputDate.slice(11, 13);
  dataOfAction.minute = inputDate.slice(14, 16);
  return dataOfAction;
};

const getCurrentMonth = (index) => {
  const monthes = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  return monthes[index];
};

const getDateString = (obj) => {
  let stringToReturn = '';
  if (new Date().getDate().toString() === obj.day && new Date().getMonth() === parseInt(obj.month, 10) - 1 && new Date().getFullYear().toString() === obj.year) {
    stringToReturn += ('Today');
  }
  if (new Date().getDate() === (parseInt(obj.day, 10) + 1) && new Date().getMonth() === parseInt(obj.month, 10) - 1 && new Date().getFullYear().toString() === obj.year) {
    stringToReturn += ('Yesterday');
  }
  if (new Date().getDate().toString() !== obj.day && new Date().getDate() !== (parseInt(obj.day, 10) + 1)) {
    stringToReturn += (`${obj.day} ${getCurrentMonth(parseInt(obj.month, 10) - 1)}`);
  }
  if (new Date().getFullYear().toString() !== obj.year) {
    stringToReturn += (` ${obj.year},`);
  }
  return stringToReturn;
};

const timeChecker = (inputDate) => {
  let stringToReturn = '';
  const obj = dateToObject(inputDate);

  stringToReturn += getDateString(obj);

  const minutes = obj.minute;
  stringToReturn += ` ${parseInt(obj.hour, 10) + 2}:${minutes}`;

  return stringToReturn;
};

export default timeChecker;
