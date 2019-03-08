/* eslint-disable import/prefer-default-export */
export function saveActivePage(activePage) {
  return { type: 'SAVE_ACTIVE_PAGE', payload: activePage };
}

export function resetActivePage() {
  return { type: 'RESET_ACTIVE_PAGE' };
}
