import { ReactNode, useState } from 'react';
import {
  CreditCardOutlined,
  HomeOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
import AndarnaIcon from '../assets/AndarnaIcon';
import { Link } from 'react-router-dom';
import Logo from './Logo';

interface SliderLayoutProps {
  children: ReactNode;
}

const { Header, Sider, Content } = Layout;

const SliderLayout = ({ children }: SliderLayoutProps) => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <Logo />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
          <Menu.Item key="1" icon={<HomeOutlined />}>
            <Link to="/">Home</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<UserOutlined />}>
            <Link to="/profile">Profile</Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<CreditCardOutlined />}>
            <Link to="/">My Savings</Link>
          </Menu.Item>
          <Menu.Item key="4" icon={<LogoutOutlined />}>
            Log out
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default SliderLayout;
