const regex = /^\s+|\s+$/g;

const checkTextareaValue = (textareaValue) => {
  if (textareaValue) {
    const noWhitespaceValue = textareaValue.replace(regex, '');
    return noWhitespaceValue;
  }

  if (!textareaValue || textareaValue.match(regex)) {
    return false;
  }

  return null;
};

export default checkTextareaValue;
