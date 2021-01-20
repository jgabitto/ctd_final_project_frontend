import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import 'mapbox-gl/dist/mapbox-gl.css';

import * as ROUTES from '../utils/constants/routes';
import PrivateRoute from './routes/PrivateRoute';
import Navbar from './navbar/Navbar';
import Footer from './footer/Footer';
import NotFound from './notFound/NotFound';
import RequestPage from './requestPage/RequestPage';
import LandingPage from './landing/LandingPage';
import LoginPage from './loginPage/Login';
import Connection from './connection/Connection';
import { ConnectionStore } from './contexts/ConnectionContext';
import { UserStore } from './contexts/UserContext';
import { JourneyStore } from './contexts/JourneyContext';
import { ViewportStore } from './contexts/ViewportContext';
import Login from './loginPage/Login';

const App = ({ cable }) => {
  console.log(cable)
  return (
    <BrowserRouter>
      <ConnectionStore>
        <UserStore>
          <ViewportStore>
            <JourneyStore>
              <Connection />
              <Navbar />
              <Switch>
                <Route exact path={ROUTES.LANDING_PAGE} component={LandingPage} />
                <Route exact path={ROUTES.REQUEST_PAGE} component={RequestPage} />
                <Route exact path={ROUTES.LOGIN_PAGE} component={LoginPage} />
                <Route component={NotFound} />
                {/* <Route path={ROUTES.HOME_PAGE} component={} /> */}
                {/* <Connection cableApp={cableApp} /> */}
              </Switch>
              <Footer />
            </JourneyStore>
          </ViewportStore>
        </UserStore>
      </ConnectionStore>
    </BrowserRouter>
  )
}

export default App;