import { makeRequest } from '../utils/graphql-helper';

const FETCHED_ORGANIZATIONS = 'FETCHED_ORGANIZATIONS';
const FETCHING_ORGANIZATIONS = 'FETCHING_ORGANIZATIONS';
const SET_ORGANIZATION = 'SET_ORGANIZATION';
const FETCHING_REPOSITORIES = 'FETCHING_REPOSITORIES';
const FETCHED_REPOSITORIES = 'FETCHED_REPOSITORIES';
const SET_REPOSITORY = 'SET_REPOSITORY';
const FETCHED_ISSUES = 'FETCHED_ISSUES';
const FETCHED_MEMBERS = 'FETCHED_MEMBERS';
const SET_FILTER = 'SET_FILTER';
const LAST_UPDATED_FILTER = 'LAST_UPDATED_FILTER';
const FETCHING_ISSUES = 'FETCHING_ISSUES';
const FETCHING_LABELS = 'FETCHING_LABELS';
const FETCHED_LABELS = 'FETCHED_LABELS';
const SET_FILTERRED_LABELS = 'SET_FILTERRED_LABELS';
const SET_EXCLUDED_LABELS = 'SET_EXCLUDED_LABELS';
const SET_SORT_DIRECTION = 'SET_SORT_DIRECTION';
const SET_SORT_BY = 'SET_SORT_BY';

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
  return (dispatch, getState) => {
    dispatch({type: SET_REPOSITORY, repository});
    fetchIssues()(dispatch, getState);
    fetchMembers()(dispatch, getState);
    fetchLabels()(dispatch, getState);
  };
}

function getIssues (org, repository) {
  return new Promise((resolve, reject) => {
    let issuesIterated = 0;
    let issues = [];
    function recursive(after) {
      return makeRequest(`{
        repository(owner:"${org}", name:"${repository}") {
          issues (first: 100, states:OPEN, orderBy:{direction: DESC, field: CREATED_AT}) {
            totalCount
            nodes {
              title
              url
              updatedAt
              createdAt
              author {
                login
              }
              reactions {
                totalCount
              }
              labels(last:100) {
                nodes {
                  name
                  color
                }
              }
              comments(last:100) {
                nodes {
                  author {
                    login
                  }
                  body
                }
              }
            }
          }
        }
      }`).then(function(response) {
        const issuesRef = response.data.repository.issues;
        const issueCount = issuesRef.totalCount;
        issuesIterated += 100;
        issues = issues.concat(issuesRef.nodes);
        if (issuesIterated < issueCount) {
          recursive(issuesRef.nodes[issuesRef.nodes.length - 1].id);
        } else {
          resolve(issues);
        }
      });
    }
    recursive();
  });
}

export function fetchMembers () {
  return (dispatch, getState) => {
    makeRequest(`{
      organization (login:"appium") {
        members(first:100) {
          nodes {
            login
          }
        }
      }
    }`).then(function (response) {
      dispatch({type: FETCHED_MEMBERS, members: response.data.organization.members.nodes})
    });
  };
}

export function fetchIssues () {
  return (dispatch, getState) => {
    const { selectedOrganization, selectedRepository } = getState().searchFilter;
    let issues = [];
    dispatch({type: FETCHING_ISSUES});
    getIssues(selectedOrganization, selectedRepository).then((issues) => {
      dispatch({type: FETCHED_ISSUES, issues});
    });
  };
}

export function setFilter (filter) {
  return (dispatch) => {
    dispatch({type: SET_FILTER, filter});
  };
};

export function setLastUpdated (lastUpdatedFilter) {
  return (dispatch) => {
    dispatch({type: LAST_UPDATED_FILTER, lastUpdatedFilter});
  };
}

export function fetchLabels () {
  return (dispatch) => {
    dispatch({type: FETCHING_LABELS});
    makeRequest(`{
      organization (login:"appium") {
        repository (name:"appium") {
          labels(last:100) {
            nodes {
              name
              color
            }
          }   
        }
      }
    }`).then(function (response) {
      const labels = response.data.organization.repository.labels.nodes;
      dispatch({type: FETCHED_LABELS, labels});
    });
  };
}

export function setFilterredLabels (filterredLabels) {
  return (dispatch) => {
    dispatch({type: SET_FILTERRED_LABELS, filterredLabels});
  }
}

export function setExcludedLabels (excludedLabels) {
  return (dispatch) => {
    dispatch({type: SET_EXCLUDED_LABELS, excludedLabels});
  }
}

export function setSortBy (sortBy) {
  return (dispatch) => {
    dispatch({type: SET_SORT_BY, sortBy});
  }
}

export function setSortDirection (sortDirection) {
  return (dispatch) => {
    dispatch({type: SET_SORT_DIRECTION, sortDirection});
  };
}

export { FETCHED_ORGANIZATIONS, FETCHING_ORGANIZATIONS, FETCHED_REPOSITORIES, FETCHING_REPOSITORIES, SET_ORGANIZATION, SET_REPOSITORY, FETCHED_ISSUES, FETCHED_MEMBERS ,
  SET_FILTER, LAST_UPDATED_FILTER, FETCHING_ISSUES, FETCHING_LABELS, FETCHED_LABELS, SET_FILTERRED_LABELS, SET_EXCLUDED_LABELS, SET_SORT_DIRECTION, SET_SORT_BY
};