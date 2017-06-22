import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './containers/App';
import SearchFilterContainer from './containers/search-filter.container';
/*import StartServerPage from './containers/StartServerPage';
import ServerMonitorPage from './containers/ServerMonitorPage';
import SessionPage from './containers/SessionPage';
import InspectorPage from './containers/InspectorPage';
import UpdaterPage from './containers/UpdaterPage';*/

export default (
  <Route path="/" component={App}>
    <IndexRoute component={SearchFilterContainer} />
  </Route>
);
