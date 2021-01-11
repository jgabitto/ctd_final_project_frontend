import React, { useState } from 'react';
import { Menu } from 'antd';
import { MailOutlined, SettingOutlined } from '@ant-design/icons';

import { StyledNavbar } from './styles/styles';

const { SubMenu } = Menu;

const Navbar = () => {
  const [state, setState] = useState({
    current: 'landing',
  })
  const { current } = state;

  const handleClick = e => {
    console.log('click ', e);
    setState({ current: e.key });
  };

  return (
    <StyledNavbar>
      <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal" style={{
        borderBottom: "none"
      }}>
        <Menu.Item id="icon" key="landing">
          RideShare
        </Menu.Item>
      </Menu>
      <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal" style={{
        borderBottom: "none"
      }}>
        <Menu.Item className="menuItem" key="about">
          About
        </Menu.Item>
        <SubMenu className="menuItem" key="SubMenu" title="Navigation Three - Submenu">
          <Menu.ItemGroup title="Item 1">
            <Menu.Item key="setting:1">Option 1</Menu.Item>
            <Menu.Item key="setting:2">Option 2</Menu.Item>
          </Menu.ItemGroup>
          <Menu.ItemGroup title="Item 2">
            <Menu.Item key="setting:3">Option 3</Menu.Item>
            <Menu.Item key="setting:4">Option 4</Menu.Item>
          </Menu.ItemGroup>
        </SubMenu>
      </Menu >
    </StyledNavbar>
  );
}

export default Navbar;