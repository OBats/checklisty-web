const setLabel = function ({ priority }) {
  switch (priority) {
  case 0:
    return 'Low';
  case 1:
    return 'Medium';
  case 2:
    return 'High';
  default:
    return '';
  }
};

export default setLabel;
