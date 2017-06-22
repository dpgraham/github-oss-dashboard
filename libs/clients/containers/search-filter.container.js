import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as SearchFilterActions from '../actions/search-filter.actions';
import SearchFilterPage from '../components/search-filter/search-filter.component';

function mapStateToProps (state) {
  return state.inspector;
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators(SearchFilterActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchFilterPage);
