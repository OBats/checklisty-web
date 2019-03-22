
import { combineReducers } from 'redux';
import user from './user';
import checklists from './mainPage/checklists';
import progressbar from './progressbar';
import selectedUsers from './createTeam/selectedUsers';
import historyPagination from './historyPagination';

export default combineReducers({
  user,
  checklists,
  progressbar,
  selectedUsers,
  historyPagination,
});
