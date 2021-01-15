import React from 'react';

import Navbar from './navbar/Navbar';
import LandingPage from './landing/LandingPage';
import Connection from './connection/Connection';

const App = ({ cableApp }) => {
  return (
    <>
      <Navbar />
      <LandingPage />
      {/* <Connection cableApp={cableApp} /> */}
    </>
  )
}

export default App;