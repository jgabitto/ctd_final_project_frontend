import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { MenuOutlined } from '@ant-design/icons';

import UserContext from '../../contexts/UserContext';

const AuthNavbar = ({ open, setOpen, userInfo }) => {
  const [authToken, setAuthToken] = useContext(UserContext);

  const logout = async () => {
    setAuthToken(null)
  }

  return (
    <>
      <div className='nav'>
        <nav>
          <div><a href="https://www.codethedream.org/" target="_blank" rel="noopener noreferrer"></a></div>
          <ul className="nav-links" style={{ transform: open ? "translateX(0px)" : "" }}>
            <li>
              <div className="nav-item"><a href="https://www.codethedream.org/about/" target="_blank" rel="noopener noreferrer">About</a></div>
            </li>
            <li>
              <div className="nav-item"><a href="https://www.codethedream.org/classes/" target="_blank" rel="noopener noreferrer">{userInfo ? userInfo.first_name : 'Home'}</a></div>
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