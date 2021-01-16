import React from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';

import Navbar from './navbar/Navbar';
import LandingPage from './landing/LandingPage';
import Connection from './connection/Connection';
import { JourneyStore } from './contexts/JourneyContext';

const App = ({ cableApp }) => {
  return (
    <>
      <JourneyStore>
        <Navbar />
        <LandingPage />
        {/* <Connection cableApp={cableApp} /> */}
      </JourneyStore>
    </>
  )
}

export default App;