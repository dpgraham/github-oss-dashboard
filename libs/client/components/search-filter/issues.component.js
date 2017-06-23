import React, { Component } from 'react';
import { Select, Input, Row, Col, Table } from 'antd';
import ReactDOM from 'react-dom';
import _ from 'lodash';

const { Option } = Select;

export default class Inspector extends Component {

  componentWillMount () {
    this.props.fetchOrganizations();
  }

  // Check if it passes the filter
  passesFilter (issue) {
    const { members, filter } = this.props;
    switch (filter) {
      case 'openedByMember':
        var isMatch = false;
        members.forEach((member) => (issue.author && member.login === issue.author.login) && (isMatch = true));
        return isMatch;
      case 'commentedOnByMember':
        var isMatch = false;
        issue.comments.nodes.forEach((comment) => {
          let author = comment.author;
          members.forEach((member) => member.login === author.login && (isMatch = true));
        });
        return isMatch;
      case 'notCommentedOnByMember':
        var isMatch = true;
        issue.comments.nodes.forEach((comment) => {
          let author = comment.author;
          members.forEach((member) => member.login === author.login && (isMatch = false));
        });
        return isMatch;
      case 'hasNoComments':
        return issue.comments.nodes.length === 0;
      case 'lastCommentedOnByMember':
        if(issue.comments.nodes.length === 0) {
          return false;
        }
        var isMatch = false;
        var author = issue.comments.nodes[issue.comments.nodes.length - 1].author;
        members.forEach((member) => member.login === author.login && (isMatch = true));
        return isMatch;
      case 'notLastCommentedOnByMember':
        if(issue.comments.nodes.length === 0) {
          return true;
        }
        var isMatch = true;
        var author = issue.comments.nodes[issue.comments.nodes.length - 1].author;
        members.forEach((member) => member.login === author.login && (isMatch = false));
        return isMatch;
      default:
        return true;
    }
  }

  passesLastUpdatedFilter(issue) {
    const { members, lastUpdatedFilter } = this.props;
    const TWO_WEEKS = 2 * 7 * 24 * 60 * 60 * 1000;
    switch (lastUpdatedFilter) {
      case 'overTwoWeeksAgo':
        return (+(new Date())) - (+(new Date(issue.updatedAt))) >= TWO_WEEKS;
      case 'underTwoWeeksAgo':
        return (+(new Date())) - (+(new Date(issue.updatedAt))) < TWO_WEEKS;
      default:
        return true;
    }
  }

  passesAllFilters(issue) {
    return this.passesFilter(issue) && this.passesLastUpdatedFilter(issue);
  }

  render () {
    const { issues, fetchingIssues } = this.props;

    if (fetchingIssues) {
      return <p style={{fontStyle: 'italic', marginTop: 20}}>Fetching Issues</p>;
    }

    if (!issues) return null;

    let totalCount = issues.length;

    let output = <ol>
      {issues.map((issue) => this.passesAllFilters(issue) ? <li>
        <a target='_blank' href={issue.url}>{issue.title}</a>
      </li> : (() => {
        totalCount--;
        return null;
      })())}
    </ol>;

    return <div>
      <p>{totalCount} Results</p>
      {output}
    </div>
  }
}