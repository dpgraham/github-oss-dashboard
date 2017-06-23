import { makeRequest } from '../utils/graphql-helper';

const FETCHED_ORGANIZATIONS = 'FETCHED_ORGANIZATIONS';
const FETCHING_ORGANIZATIONS = 'FETCHING_ORGANIZATIONS';
const SET_ORGANIZATION = 'SET_ORGANIZATION';
const FETCHING_REPOSITORIES = 'FETCHING_REPOSITORIES';
const FETCHED_REPOSITORIES = 'FETCHED_REPOSITORIES';
const SET_REPOSITORY = 'SET_REPOSITORY';

export function fetchOrganizations () {
  return (dispatch, getState) => {
    dispatch({type: FETCHING_ORGANIZATIONS});

    // TODO: Don't hardcode login
    makeRequest(`{
      user(login:"dpgraham") {
        name
        organizations(last:100) {
          nodes {
            name
            login
          }
        }
      }
    }`).then((result) => {
      dispatch({
        type: FETCHED_ORGANIZATIONS,
        organizations: result.data.user.organizations.nodes,
      });
    });
  };
}

export function setOrganization (organization) {
  return (dispatch, getState) => {
    dispatch({type: SET_ORGANIZATION, organization});
    fetchRepositories()(dispatch, getState);
  };
}

export function fetchRepositories () {
  return (dispatch, getState) => {
    const { selectedOrganization } = getState().searchFilter;
    dispatch({type: FETCHING_REPOSITORIES});
    makeRequest(`{
      organization(login:"${selectedOrganization}") {
        repositories(last:100) {
          nodes {
            name
          }
        }
      }
    }`).then((result) => {
      dispatch({
        type: FETCHED_REPOSITORIES,
        repositories: result.data.organization.repositories.nodes,
      });
    });
  };
}

export function setRepository (repository) {
  return (dispatch) => {
    dispatch({type: SET_REPOSITORY, repository});
  };
}

export { FETCHED_ORGANIZATIONS, FETCHING_ORGANIZATIONS, FETCHED_REPOSITORIES, FETCHING_REPOSITORIES, SET_ORGANIZATION, SET_REPOSITORY };