import React, { Component, PropTypes } from 'react';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

export default class App extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired
  };

  render () {
    return this.props.children;
  }
}