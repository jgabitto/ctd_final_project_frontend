import React, { useState, useContext } from 'react';
import { Menu } from 'antd';
import { withRouter } from 'react-router-dom';

import UserContext from '../../contexts/UserContext';
import AuthNavbar from './authenticated/AuthNavbar';
import NonAuthNavbar from './unauthenticated/NonAuthNavbar';
import '../../index.css';


const Navbar = ({ history }) => {
  const [authToken, setAuthToken, userInfo, setUserInfo] = useContext(UserContext);
  const [open, setOpen] = useState(false);
  const [state, setState] = useState({
    current: 'landing',
  })

  return (
    <>
      {
        authToken ? <AuthNavbar history={history} userInfo={userInfo} open={open} setOpen={setOpen} /> : <NonAuthNavbar open={open} setOpen={setOpen} />
      }
    </>
  );
}

export default withRouter(Navbar);