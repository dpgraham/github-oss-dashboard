import React, { Component } from 'react';
import { Select, Input, Row, Col, Table } from 'antd';
import ReactDOM from 'react-dom';
import Issues from './issues.component.js';

const { Option } = Select;

export default class Inspector extends Component {
  
  componentWillMount () {
    this.props.fetchOrganizations();
  }

  render () {
    const { organizations, setOrganization, selectedOrganization, repositories, setRepository, selectedRepository,
      issues, setFilter, filter } = this.props;
    return <div>
      <h1>Github Issue Filters</h1>
      <Row>
      <span>Organization</span>
      <Select style={{width: '100%'}}
          value={selectedOrganization}
          onChange={(value) => setOrganization(value)}>
      {
        organizations.map((organization) => <Option 
          style={{ width: 120 }} 
          key={organization.login}
          value={organization.login}>
          {organization.name}
        </Option>)
      }
      </Select>
      </Row>
      <Row>
      <span>Repository:</span>
      {repositories && <Select style={{width: '100%'}}
          value={selectedRepository}
          onChange={(value) => setRepository(value)}>
        {
          repositories.map((repository) => <Option 
            style={{ width: 120 }} 
            key={repository.name}>
            {repository.name}
          </Option>)
        }
        </Select>}
      </Row>
      <Row>
        <span>Filter:</span>
        <Select style={{width: '100%'}} onChange={setFilter} value={filter}>
          <Option value='none'>All open issues</Option>
          <Option value='openedByMember'>Was opened by a team member</Option>
          <Option value='commentedOnByMember'>Was commented on by a team member</Option>
          <Option value='notCommentedOnByMember'>Was not commented on by a team member</Option>
          <Option value='lastCommentedOnByMember'>Was last commented on by a team member</Option>
          <Option value='notLastCommentedOnByMember'>Was not last commented on by a team member</Option>
          <Option value='hasNoComments'>Has no comment</Option>
        </Select>
      </Row>
      <Row>
        <Issues {...this.props} />
      </Row>
    </div>;
  }
}