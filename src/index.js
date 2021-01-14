import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css'
import actionCable from 'actioncable';

import App from './components/App';

const CableApp = {}

CableApp.cable = actionCable.createConsumer('ws://localhost:3000/cable')

ReactDOM.render(<App cableApp={CableApp} />, document.getElementById("root"));