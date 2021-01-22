import React, { useState, useEffect, useContext } from 'react';
import { Button, Space } from 'antd';

import * as ROUTES from '../../../utils/constants/routes';
import SearchBar from './searchBar/SearchBar';
import UserContext from '../../contexts/UserContext';


const RideForm = ({ viewport, setViewport, history }) => {
  const [authToken, setAuthToken, userInfo, setUserInfo] = useContext(UserContext);

  const onClick = () => {
    if (authToken) return history.push(`${ROUTES.REQUEST_PAGE}`);

    return history.push(`${ROUTES.LOGIN_PAGE}`);
  }

  return (
    <div className='contain'>
      <div className='form'>
        <h2>Request a Ride Now</h2>
        <SearchBar viewport={viewport} setViewport={setViewport} />
        <Space>
          <Button type="primary" onClick={onClick}>
            Request a ride
        </Button>
          {/* <Button type="primary" htmlType="submit">
            Schedule for later
        </Button> */}
        </Space>
      </div>
    </div>
  );
}

export default RideForm;