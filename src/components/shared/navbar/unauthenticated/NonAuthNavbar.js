import React from 'react';
import { Link } from 'react-router-dom';
import { UserOutlined, MenuOutlined } from '@ant-design/icons';

import * as ROUTES from '../../../../utils/constants/routes';

const NonAuthNavbar = ({ open, setOpen }) => {
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
              <div className="nav-item"><Link to="/login" ><UserOutlined /> Log in</Link></div>
            </li>
            <li>
              <div className="sign-up"><Link to="/register" >Sign up</Link></div></li>
          </ul>
          <MenuOutlined onClick={() => setOpen(!open)} className="fas fa-bars burger" />
        </nav>
      </div>
    </>
  )
}

export default NonAuthNavbar;