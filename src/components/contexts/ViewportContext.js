import React, { useState } from 'react';

const Context = React.createContext();

export const ViewportStore = ({ children }) => {
  const [viewport, setViewport] = useState({
    width: 400,
    height: 400,
    latitude: 38.0000,
    longitude: -97.0000,
    zoom: 8
  });

  return (
    <Context.Provider
      value={[viewport, setViewport]}
    >
      {children}
    </Context.Provider>
  )
}

export default Context;