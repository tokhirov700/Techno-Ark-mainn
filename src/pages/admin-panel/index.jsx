import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
import { NavLink, useLocation, Outlet } from 'react-router-dom';
import { adminRights } from '../../router/routes';
import MainLogo from '../../assets/texnoark-logo.svg';

const { Header, Sider, Content } = Layout;
const { Item } = Menu;

const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { pathname } = useLocation();
  const {
    token: { colorBgContainer, borderRadiusLG, darkDangerItemActiveBg },
  } = theme.useToken();

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed} width={260}>
        <div className="demo-logo-vertical" />
  
        <div className='flex p-4 gap-2 font-semibold mb-2'>
          <img
            src={MainLogo}
            alt="main-logo"
            style={{
              width: collapsed ? '30px' : '70px', 
              transition: 'width 0.3s ease',
            }}
          />
    
          {!collapsed && (
            <span className='text-[18px] text-[#fff] flex'>Techno Ark</span> 
          )}
        </div>

        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[pathname]}
        >
          {adminRights?.map((item) => (
            <Item key={item.path} icon={item.icon}>
              <NavLink to={item.path} style={{ fontSize: "16px" }}>{item.label}</NavLink> 
            </Item>
          ))}
        </Menu>
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
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
            margin: '0 16px',
            minHeight: "100vh",
            background: darkDangerItemActiveBg,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;
