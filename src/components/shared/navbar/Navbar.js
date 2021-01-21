import React, { useState, useContext } from 'react';
import { Menu } from 'antd';
import { UserOutlined } from '@ant-design/icons';

import { StyledNavbar } from './styles/styles';
import UserContext from '../../contexts/UserContext';
import AuthNavbar from './authenticated/AuthNavbar';
import NonAuthNavbar from './unauthenticated/NonAuthNavbar';
import '../../index.css';

const { SubMenu } = Menu;

const Navbar = () => {
  const [authToken, setAuthToken, userInfo, setUserInfo] = useContext(UserContext);
  const [open, setOpen] = useState(false);
  const [state, setState] = useState({
    current: 'landing',
  })
  const { current } = state;

  const handleClick = e => {
    console.log('click ', e);
    setState({ current: e.key });
  };

  return (
    <>
      {
        authToken ? <AuthNavbar userInfo={userInfo} open={open} setOpen={setOpen} /> : <NonAuthNavbar open={open} setOpen={setOpen} />
      }
    </>
  );

  // return (
  //   <StyledNavbar>
  //     <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal" style={{
  //       borderBottom: "none"
  //     }}>
  //       <Menu.Item id="icon" key="landing">
  //         RideShare
  //       </Menu.Item>
  //     </Menu>
  //     <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal" style={{
  //       borderBottom: "none"
  //     }}>
  //       <Menu.Item className="menuItem" key="about">
  //         About
  //       </Menu.Item>
  //       <SubMenu className="menuItem" key="SubMenu" title="Navigation Three - Submenu">
  //         <Menu.ItemGroup title="Item 1">
  //           <Menu.Item key="setting:1">Option 1</Menu.Item>
  //           <Menu.Item key="setting:2">Option 2</Menu.Item>
  //         </Menu.ItemGroup>
  //         <Menu.ItemGroup title="Item 2">
  //           <Menu.Item key="setting:3">Option 3</Menu.Item>
  //           <Menu.Item key="setting:4">Option 4</Menu.Item>
  //         </Menu.ItemGroup>
  //       </SubMenu>
  //     </Menu >
  //   </StyledNavbar>
  // );
}

export default Navbar;