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
        members.forEach((member) => member.login === issue.author.login && (isMatch = true));
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

  render () {
    const { issues } = this.props;

    if (!issues) return null;

    let totalCount = issues.length;

    let output = <ul>
      {issues.map((issue) => this.passesFilter(issue) ? <li>
        <a target='_blank' href={issue.url}>{issue.title}</a>
      </li> : (() => {
        totalCount--;
        return null;
      })())}
    </ul>;

    return <div>
      <p>{totalCount} Results</p>
      {output}
    </div>
  }
}