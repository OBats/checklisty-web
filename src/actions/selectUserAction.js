export function addSelectedUser(arrayOfSelectedUsers) {
  return { type: 'ADD_SELECTED_USER', payload: arrayOfSelectedUsers };
}
export function changeSuggestionState(showSuggestion) {
  return { type: 'SHOW_SUGGESTION', payload: showSuggestion };
}
