/* eslint-disable import/prefer-default-export */
import http from '../api/http';

export default function fetchData(activePage, searchFilter, selectItems) {
  return function (dispatch) {
    dispatch({ type: 'CHANGE_LISTS_LOADING', payload: true });
    http.get(`api/checklists/?page=${activePage}&search=${searchFilter}&limit=${selectItems}`)
      .then((res) => {
        dispatch({ type: 'FETCH_CHECKLISTS', payload: res.data.result });
        dispatch({ type: 'SAVE_SEARCH_VALUE', payload: searchFilter });
        dispatch({ type: 'CHANGE_COMPONENT_LOADING', payload: false });
        dispatch({ type: 'CHANGE_TOTAL_PAGE_VALUE', payload: Math.ceil((res.data.totalItems) / selectItems) });
        dispatch({ type: 'CHANGE_LISTS_LOADING', payload: false });
      });
  };
}
