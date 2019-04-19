/* eslint-disable default-case */
/* eslint-disable indent */
import http from '../api/http';

export function fetchUserInvites(userId) {
  return function (dispatch) {
    http.get(`api/team/getInvites/${userId}`)
      .then((res) => {
        dispatch({ type: 'FETCH_USER_INVITES', payload: res.data });
      });
  };
}
export function refreshInvitesLength(userInvites) {
  return { type: 'DECLINE_INVITE', payload: userInvites };
}
