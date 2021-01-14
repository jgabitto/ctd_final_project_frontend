import React from 'react';

import Navbar from './navbar/Navbar';
import Connection from './connection/Connection';

const App = ({ cableApp }) => {
  return (
    <>
      <Navbar />
      <Connection cableApp={cableApp} />
    </>
  )
}

export default App;