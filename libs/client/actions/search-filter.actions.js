import { makeRequest } from '../utils/graphql-helper';

const FETCHED_ORGANIZATIONS = 'FETCHED_ORGANIZATIONS';
const FETCHING_ORGANIZATIONS = 'FETCHING_ORGANIZATIONS';
const SET_ORGANIZATION = 'SET_ORGANIZATION';

export function fetchRepositories () {
  return (dispatch) => {
    dispatch({type: FETCHING_ORGANIZATIONS});
    makeRequest(`{
      user(login:"dpgraham") {
      name
      organizations(last:100) {
        nodes {
          name
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
  return (dispatch) => {
    dispatch({type: SET_ORGANIZATION, organization});
  };
}

export { FETCHED_ORGANIZATIONS, FETCHING_ORGANIZATIONS, SET_ORGANIZATION };