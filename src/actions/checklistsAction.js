/* eslint-disable import/prefer-default-export */
export function fetchChecklists(checklists) {
  return { type: 'FETCH_CHECKLISTS', payload: checklists };
}
export function changeComponentLoading(componentLoader) {
  return { type: 'CHANGE_COMPONENT_LOADING', payload: componentLoader };
}
export function changeListsLoading(listsLoader) {
  return { type: 'CHANGE_LISTS_LOADING', payload: listsLoader };
}
export function saveActivePage(activePage) {
  return { type: 'SAVE_ACTIVE_PAGE', payload: activePage };
}
export function resetActivePage() {
  return { type: 'RESET_ACTIVE_PAGE' };
}
export function saveSearchValue(searchFilter) {
  return { type: 'SAVE_SEARCH_VALUE', payload: searchFilter };
}
export function changeTotalPageValue(totalPage) {
  return { type: 'CHANGE_TOTAL_PAGE_VALUE', payload: totalPage };
}
export function saveSelectValue(selectItems) {
  return { type: 'CHANGE_VALUE_SELECT', payload: selectItems };
}
