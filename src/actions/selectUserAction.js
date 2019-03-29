export function addSelectedUser(arrayOfSelectedUsers) {
  return { type: 'ADD_SELECTED_USER', payload: arrayOfSelectedUsers };
}
export function changeSuggestionState(showSuggestion) {
  return { type: 'SHOW_SUGGESTION', payload: showSuggestion };
}
export function removeSelectedUser(arrayOfSelectedUsers) {
  return { type: 'REMOVE_USER', payload: arrayOfSelectedUsers };
}
export function changeSelectedState(showSelectedUsers) {
  return { type: 'SHOW_SELECTED_USER', payload: showSelectedUsers };
}
export function saveSearchValue(searchUserValue) {
  return { type: 'SAVE_SEARCH_VALUE', payload: searchUserValue };
}
export function changeAnimationState(animationState) {
  return { type: 'CHANGE_ANIMATION', payload: animationState };
}
export function saveSearchTeamValue(searchTeamValue) {
  return { type: 'SAVE_SEARCH_TEAM', payload: searchTeamValue };
}
export function saveActivePage(activePage) {
  return { type: 'TEAM_ACTIVE_PAGE', payload: activePage };
}
export function resetActivePage() {
  return { type: 'RESET_TEAM_ACTIVE_PAGE' };
}
export function changeTotalPageValue(totalPage) {
  return { type: 'CHANGE_TEAM_TOTAL_PAGE_VALUE', payload: totalPage };
}
export function saveTeamsAmount(selectTeams) {
  return { type: 'CHANGE_TEAMS_AMOUNT', payload: selectTeams };
}
