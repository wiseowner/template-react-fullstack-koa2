import React, {Component} from 'react';
import { Layout, Header, Menu } from 'antd';
import { Route, Switch, withRouter, Link, Redirect } from "react-router-dom";
import About from './pages/Test/about';
import Team from './pages/Test';
import Contact from './pages/Test/contact';
const { Content } = Layout;

class App extends Component {
  render() {
    return <Layout >
      <div className="logo"></div>
       <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={['1']}
        style={{ lineHeight: '64px' }}
      >
        <Menu.Item key="1">
          <Link to="/team">team</Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Link to="/about">about</Link>
        </Menu.Item>
        <Menu.Item key="3">
          <Link to="/contact">contact</Link>
        </Menu.Item>
      </Menu>
      <Layout>
        <Content className='layout-content'>
          <Switch>
            <Route path="/team" exact component={Team}/>
            <Route path="/about" exact component={About}/>
            <Route path="/contact" exact component={Contact}/>
            <Redirect to="/team" />
          </Switch>
        </Content>
      </Layout>
    </Layout>
  }
}

export default withRouter(App);
