import { omit } from 'lodash';

import { FETCHING_ORGANIZATIONS, FETCHED_ORGANIZATIONS, SET_ORGANIZATION, 
  FETCHING_REPOSITORIES, FETCHED_REPOSITORIES, SET_REPOSITORY,
  FETCHING_ISSUES, FETCHED_ISSUES, FETCHED_MEMBERS, SET_FILTER, LAST_UPDATED_FILTER } from '../actions/search-filter.actions';

const INITIAL_STATE = {
  organizations: [],
  repositories: [],
  issues: [],
  fetchingOrganizations: false,
  fetchingRepositories: false,
  selectedOrganization: null,
  selectedRepository: null,
  fetchingIssues: false,
};

export default function searchFilter (state=INITIAL_STATE, action) {
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
      return {
        ...state,
        selectedOrganization: action.organization,
      };
    case FETCHED_REPOSITORIES:
      return {
        ...state,
        fetchingRepositories: false,
        repositories: action.repositories,
      };
    case FETCHING_REPOSITORIES:
      return {
        ...state,
        fetchingRepositories: true,
        repositories: [],
      };
    case SET_REPOSITORY:
      return {
        ...state,
        selectedRepository: action.repository,
      };
    case FETCHED_ISSUES:
      return {
        ...state,
        issues: action.issues,
        fetchingIssues: false,
      };
    case FETCHED_MEMBERS:
      return {
        ...state,
        members: action.members,
      };
    case SET_FILTER:
      return {
        ...state,
        filter: action.filter,
      };
    case LAST_UPDATED_FILTER:
      return {
        ...state,
        lastUpdatedFilter: action.lastUpdatedFilter
      };
    case FETCHING_ISSUES: 
      return {
        ...state,
        fetchingIssues: true,
      };
    default:
      return {...state};
  }
}
