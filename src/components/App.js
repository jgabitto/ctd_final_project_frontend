import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import 'mapbox-gl/dist/mapbox-gl.css';

import * as ROUTES from '../utils/constants/routes';
import RequestPage from './requestPage/RequestPage';
import LandingPage from './landing/LandingPage';
import Connection from './connection/Connection';
import { ConnectionStore } from './contexts/ConnectionContext';
import { UserStore } from './contexts/UserContext';
import { JourneyStore } from './contexts/JourneyContext';
import { ViewportStore } from './contexts/ViewportContext';

const App = ({ cable }) => {
  console.log(cable)
  return (
    <BrowserRouter>
      <ConnectionStore>
        <UserStore>
          <ViewportStore>
            <JourneyStore>
              <Connection />
              <Switch>
                <Route exact path={ROUTES.LANDING_PAGE} component={LandingPage} />
                <Route exact path={ROUTES.REQUEST_PAGE} component={RequestPage} />
                {/* <Route path={ROUTES.HOME_PAGE} component={} /> */}
                {/* <Connection cableApp={cableApp} /> */}
              </Switch>
            </JourneyStore>
          </ViewportStore>
        </UserStore>
      </ConnectionStore>
    </BrowserRouter>
  )
}

export default App;