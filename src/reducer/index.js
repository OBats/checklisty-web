
import { combineReducers } from 'redux';
import user from './user';
import pagination from './pagination';
import progressbar from './progressbar';

export default combineReducers({
  user,
  pagination,
  progressbar,
});
