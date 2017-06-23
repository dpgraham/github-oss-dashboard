import { omit } from 'lodash';

import { FETCHING_ORGANIZATIONS, FETCHED_ORGANIZATIONS, SET_ORGANIZATION } from '../actions/search-filter.actions';

const INITIAL_STATE = {
  organizations: [],
  repositories: [],
  fetchingOrganizations: false,
  selectedOrganization: null,
};

export default function searchFilter (state=INITIAL_STATE, action) {
  console.log('!!!!action', action);
  switch (action.type) {
    case FETCHING_ORGANIZATIONS: 
      return {
        ...state,
        organizations: [],
        fetchingOrganizations: true,
      };
    case FETCHED_ORGANIZATIONS:
      return {
        ...state,
        organizations: action.organizations,
        fetchingOrganizations: false,
      };
    case SET_ORGANIZATION:
      console.log('!!!action', action);
      return {
        ...state,
        selectedOrganization: action.organization,
      };
    default:
      console.log('!!!!!action', action);
      return {...state};
  }
}
