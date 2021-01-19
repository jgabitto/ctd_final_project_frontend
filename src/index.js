import React, { createContext } from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css'
import actionCable from 'actioncable';

import App from './components/App';
import {ConnectionStore} from './components/contexts/ConnectionStore';

// const CableApp = {}

// CableApp.cable = actionCable.createConsumer('ws://localhost:3000/cable')

// export const ActionCableContext = createContext()
ReactDOM.render(<ConnectionStore><App /></ConnectionStore>, document.getElementById("root"));


// ReactDOM.render(<ActionCableContext.Provider value={CableApp.cable}><App /></ActionCableContext.Provider>, document.getElementById("root"));

// import ActionCable from 'actioncable';
// import ActionCableProvider from 'react-actioncable-provider';

// const cable = ActionCable.createConsumer('ws://localhost:3000/cable');

// ReactDOM.render(<ActionCableProvider cable={cable}><App /></ActionCableProvider>, document.getElementById("root"));