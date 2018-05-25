/**
 * @description - develop web page component
 * @author - huang.jian <hjj491229492@hotmail.com>
 */
// External
import React, { Fragment } from 'react';
import {
  BrowserRouter,
  NavLink,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import { Layout, Menu, Icon } from 'antd';
import { hot } from 'react-hot-loader';
// Internal
import { Text } from './components';
import styles from './App.pcss';
// scope
const { Sider, Content } = Layout;
const showcases = {
  Text: () => (
    <Fragment>
      <Text theme="primary">Lift is short, enjoy yourself!</Text>
      <Text theme="info">Lift is short, enjoy yourself!</Text>
      <Text theme="success">Lift is short, enjoy yourself!</Text>
      <Text theme="warning">Lift is short, enjoy yourself!</Text>
      <Text theme="danger">Lift is short, enjoy yourself!</Text>
    </Fragment>
  ),
};

function App() {
  return (
    <BrowserRouter>
      <Layout className={styles.package}>
        <Sider className={styles.sider}>
          <Menu
            mode="inline"
            theme="dark"
            defaultSelectedKeys={['package.text']}
          >
            <Menu.Item key="package.text" className={styles.menuItem}>
              <Icon type="user" />
              <NavLink to="/package/text" className={styles.link}>
                Text
              </NavLink>
            </Menu.Item>
          </Menu>
        </Sider>
        <Content className={styles.content}>
          <Switch>
            <Route path="/package/text" component={showcases.Text} />
            <Redirect to="/package/text" />
          </Switch>
        </Content>
      </Layout>
    </BrowserRouter>
  );
}

export default hot(module)(App);
