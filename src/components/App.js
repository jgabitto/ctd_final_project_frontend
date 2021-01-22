import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import 'mapbox-gl/dist/mapbox-gl.css';

import * as ROUTES from '../utils/constants/routes';
import PrivateRoute from './shared/routes/PrivateRoute';
import Navbar from './shared/navbar/Navbar';
import Footer from './shared/footer/Footer';
import AboutPage from './aboutPage/AboutPage';
import NotFound from './notFound/NotFound';
import RequestPage from './requestPage/RequestPage';
import CarPage from './carPage/Car';
import LandingPage from './landingPage/LandingPage';
import LoginPage from './loginPage/Login';
import TripsPage from './tripsPage/TripsPage';
import ProfilePage from './profilePage/ProfilePage';
import Registration from './registerPage/Register';
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
              <Navbar />
              <Switch>
                <Route exact path={ROUTES.LANDING_PAGE} component={CarPage} />
                <Route exact path={ROUTES.REQUEST_PAGE} component={RequestPage} />
                <Route exact path={ROUTES.LOGIN_PAGE} component={LoginPage} />
                <Route exact path={ROUTES.REGISTER_PAGE} component={Registration} />
                <Route exact path={ROUTES.ABOUT_PAGE} component={AboutPage} />
                <Route exact path={ROUTES.DIRECTIONS_PAGE} component={LandingPage} />
                <PrivateRoute exact path={ROUTES.TRIPS_PAGE} component={TripsPage} />
                <PrivateRoute exact path={ROUTES.PROFILE_PAGE} component={ProfilePage} />
                <Route component={NotFound} />
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