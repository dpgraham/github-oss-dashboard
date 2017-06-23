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
      issues, setFilter, filter, setLastUpdated, lastUpdatedFilter, setFilterredLabels, filterredLabels, labels,
      setExcludedLabels, excludedLabels, setSortBy, sortBy, setSortDirection, sortDirection } = this.props;
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
          <Option value='commentedOnByMe'>Was commented on by me</Option>
          <Option value='hasNoComments'>Has no comment</Option>
        </Select>
      </Row>
      <Row>
        <span>Last updated:</span>
        <Select style={{width: '100%'}} onChange={setLastUpdated} value={lastUpdatedFilter}>
          <Option value='none'>Any time</Option>
          <Option value='overTwoWeeksAgo'>More than two weeks ago</Option>
          <Option value='underTwoWeeksAgo'>Less than two weeks ago</Option>
        </Select>
      </Row>
      <Row>
        <span>Has labels:</span>
        <Select mode="tags" style={{width:'100%'}} onChange={setFilterredLabels} value={filterredLabels}>
          {labels.map((label) => <Option key={label.name} value={label.name} style={{backgroundColor: label.color}}>{label.name}</Option>)}
        </Select>
      </Row>
      <Row>
        <span>Exclude with labels:</span>
        <Select mode="tags" style={{width:'100%'}} onChange={setExcludedLabels} value={excludedLabels}>
          {labels.map((label) => <Option key={label.name} value={label.name} style={{backgroundColor: label.color}}>{label.name}</Option>)}
        </Select>
      </Row>
      <Row>
        <span>Sort by:</span>
        <Col>
          <Select style={{width: '100%'}} onChange={setSortBy} value={sortBy} defaultValue='updatedAt'>
            <Option value='updatedAt'>Updated at</Option>
            <Option value='createdAt'>Created at</Option>
            <Option value='numberOfReactions'>Number of reactions</Option>
          </Select>
          <Select style={{width: '100%', marginTop: '1em'}} onChange={setSortDirection} value={sortDirection} defaultValue='desc'>
            <Option value='desc'>Descending</Option>
            <Option value='asc'>Ascending</Option>
          </Select>
        </Col>
      </Row>
      <Row>
        <Issues {...this.props} />
      </Row>
    </div>;
  }
}