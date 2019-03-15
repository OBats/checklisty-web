/* eslint-disable import/prefer-default-export */
export function saveCurrentProgress(currentProgress, amountOfCheckedItems) {
  return { type: 'SAVE_ACTIVE_PROGRESSBAR', payload: { currentProgress, amountOfCheckedItems } };
}
