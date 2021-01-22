import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Dropdown } from 'antd';
import { MenuOutlined, PictureOutlined, SettingOutlined } from '@ant-design/icons';

import * as ROUTES from '../../../../utils/constants/routes';
import UserContext from '../../../contexts/UserContext';

const menu = (
  <Menu>
    <Menu.Item>
      <Link to={ROUTES.TRIPS_PAGE}>
        <PictureOutlined style={{ fontSize: '25px' }} /> <strong><span style={{ fontSize: '15px' }}>My Trips</span></strong>
      </Link>
    </Menu.Item>
    <Menu.Item>
      <Link to={ROUTES.PROFILE_PAGE}>
        <SettingOutlined style={{ fontSize: '25px' }} /> <strong><span style={{ fontSize: '15px' }}>Settings</span></strong>
      </Link>
    </Menu.Item>
  </Menu>
);

const AuthNavbar = ({ history, open, setOpen, userInfo }) => {
  const [authToken, setAuthToken] = useContext(UserContext);

  const logout = async () => {
    setAuthToken(null);
    history.push(`${ROUTES.LANDING_PAGE}`);
  }

  return (
    <>
      <div className='nav'>
        <nav>
          <div style={{ fontSize: '22px', color: 'white' }}><Link to={ROUTES.LANDING_PAGE} style={{ color: 'white' }}>RideShare</Link></div>
          <ul className="nav-links" style={{ transform: open ? "translateX(0px)" : "" }}>
            <li>
              <div className="nav-item"><Link to={ROUTES.ABOUT_PAGE}>About</Link></div>
            </li>
            <li>
              <div className="nav-item">
                <Dropdown overlay={menu}>
                  <Link to="#">{userInfo ? userInfo.first_name : null}
                  </Link>
                </Dropdown>
              </div>
            </li>
            <li>
              <div className="sign-up"><Link to="#" onClick={logout}>Logout</Link></div></li>
          </ul>
          <MenuOutlined onClick={() => setOpen(!open)} className="fas fa-bars burger" />
        </nav>
      </div>
    </>
  )
}

export default AuthNavbar;