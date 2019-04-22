/* eslint-disable import/prefer-default-export */
export function saveTeamName(name) {
  return { type: 'SHOW_TEAM_NAME', payload: name };
}
