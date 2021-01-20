import React from 'react';

const AuthNavbar = ({ open, setOpen, userInfo }) => {
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
              <div className="nav-item"><a href="https://www.codethedream.org/classes/" target="_blank" rel="noopener noreferrer">{userInfo.first_name}</a></div>
            </li>
            <li>
              <div className="sign-up"><a href="https://www.codethedream.org/apply-now/" target="_blank" rel="noopener noreferrer">Log out</a></div></li>
          </ul>
          <i onClick={() => setOpen(!open)} className="fas fa-bars burger"><span>MENU</span></i>
        </nav>
      </div>
    </>
  )
}

export default AuthNavbar;