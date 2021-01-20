import React from 'react';
import { UserOutlined } from '@ant-design/icons';

const NonAuthNavbar = ({ open, setOpen }) => {
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
              <div className="nav-item"><a href="https://www.codethedream.org/classes/" target="_blank" rel="noopener noreferrer"><UserOutlined /> Log in</a></div>
            </li>
            <li>
              <div className="sign-up"><a href="https://www.codethedream.org/apply-now/" target="_blank" rel="noopener noreferrer">Sign Up</a></div></li>
          </ul>
          <i onClick={() => setOpen(!open)} className="fas fa-bars burger"><span>MENU</span></i>
        </nav>
      </div>
    </>
  )
}

export default NonAuthNavbar;