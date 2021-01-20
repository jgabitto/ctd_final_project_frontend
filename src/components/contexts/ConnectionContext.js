import React, { useState, useEffect } from 'react';
import actionCable from 'actioncable';

const Context = React.createContext();

export const ConnectionStore = ({ children }) => {
  const [connection, setConnection] = useState(null);

  const CableApp = {}
  CableApp.cable = actionCable.createConsumer('wss://ctd-final-project.herokuapp.com/cable');
  // CableApp.cable = actionCable.createConsumer('ws://localhost:3000/cable');

  return (
    <Context.Provider
      value={[CableApp, connection, setConnection]}
    >
      {children}
    </Context.Provider>
  )
}

export default Context;