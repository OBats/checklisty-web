
import { combineReducers } from 'redux';
import user from './user';
import pagination from './pagination';

export default combineReducers({
  user,
  pagination,
});
