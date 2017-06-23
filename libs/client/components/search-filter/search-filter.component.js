import React, { Component } from 'react';
import { Select, Input } from 'antd';
import ReactDOM from 'react-dom';

const { Option } = Select;

export default class Inspector extends Component {

  componentWillMount () {
    this.props.fetchOrganizations();
  }

  render () {
    const { organizations, setOrganization, selectedOrganization, repositories, setRepository, selectedRepository } = this.props;
    console.log(this.props, '!!!!');
    return <div>
      <Select style={{width: '150px'}}
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
      {repositories && <Select style={{width: '150px'}}
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
    </div>;
  }
}