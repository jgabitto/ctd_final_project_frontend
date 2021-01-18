import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';

import UserContext from '../../contexts/UserContext';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const [authUser, setAuthUser] = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={props => authUser ?
        (<Component {...props} />)
        : (<Redirect to="/" />)
      }
    />
  )
}

export default PrivateRoute;