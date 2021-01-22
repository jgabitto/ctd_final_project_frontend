import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import _ from 'lodash';

import { USER } from '../../utils/constants/constants';

const Context = React.createContext();

export const UserStore = ({ children }) => {
  const [cookies, setCookie, removeCookie] = useCookies(['auth_token']);
  const [authToken, setAuthToken,] = useState(cookies['auth_token']);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    if (authToken && _.isEmpty(cookies)) {
      setCookie('auth_token', authToken.token);
      setUserInfo(authToken.info);
    }

    if (!authToken && !_.isEmpty(cookies)) {
      removeCookie('auth_token');
    }

  }, [authToken])

  useEffect(() => {
    if (!_.isEmpty(cookies)) {
      const getData = async () => {
        const response = await fetch(USER, {
          method: 'GET',
          mode: 'cors',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json', 'Authorization': `${authToken}` }
        });
        const data = await response.json();

        setUserInfo(data);
      }
      getData();
    }
  }, [])

  console.log(userInfo)

  return (
    <Context.Provider
      value={[authToken, setAuthToken, userInfo, setUserInfo]}
    >
      {children}
    </Context.Provider>
  )
}

export default Context;