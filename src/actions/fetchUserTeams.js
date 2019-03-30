/* eslint-disable import/prefer-default-export */
import http from '../api/http';

export default function fetchUserTeams(activePage, searchTeamValue, selectTeams) {
  return function (dispatch) {
    dispatch({ type: 'CHANGE_LISTS_LOADING', payload: true });
    http.get(`api/team/myteams/?page=${activePage}&search=${searchTeamValue}&limit=${selectTeams}`)
      .then((res) => {
        dispatch({ type: 'FETCH_TEAMS', payload: res.data.teams });
        dispatch({ type: 'SAVE_SEARCH_TEAM', payload: searchTeamValue });
        dispatch({ type: 'CHANGE_COMPONENT_LOADING', payload: false });
        dispatch({ type: 'CHANGE_LISTS_LOADING', payload: false });
        dispatch({ type: 'CHANGE_TEAM_TOTAL_PAGE_VALUE', payload: Math.ceil((res.data.totalTeams) / selectTeams) });
        dispatch({ type: 'SAVE_TEAMS_AMOUNT', payload: res.data.teamsAmount });
      });
  };
}
