import React, { Component } from 'react';
import { Select, Input } from 'antd';
import ReactDOM from 'react-dom';

const { Option } = Select;

export default class Inspector extends Component {

  componentWillMount () {
    this.props.fetchRepositories();
  }

  render () {
    const { organizations, setOrganization, selectedOrganization } = this.props;
    console.log(this.props, '!!!!');
    return <div>
      <Select style={{width: '150px'}}
          value={selectedOrganization}
          onChange={(value) => setOrganization(value)}>
      {
        organizations.map((organization) => <Option 
          style={{ width: 120 }} 
          key={organization.name}>
          {organization.name}
        </Option>)
      }
      </Select>
    </div>;
  }
}