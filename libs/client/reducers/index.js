import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import searchFilter from './search-filter.reducer';

// create our root reducer
const rootReducer = combineReducers({
  routing,
  searchFilter,
});

export default rootReducer;
