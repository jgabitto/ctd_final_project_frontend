import React from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';

import Navbar from './navbar/Navbar';
import LandingPage from './landing/LandingPage';
import Connection from './connection/Connection';

const App = ({ cable }) => {
  console.log(cable)
  return (
    <>
      <Navbar />
      <LandingPage cable={cable}/>
      <Connection cableApp={cable} />
    </>
  )
}

export default App;