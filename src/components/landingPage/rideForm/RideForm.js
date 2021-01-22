import React, { useState, useEffect, useContext } from 'react';
import { Button, Space } from 'antd';

import SearchBar from './searchBar/SearchBar';
import JourneyContext from '../../contexts/JourneyContext';
import UserContext from '../../contexts/UserContext';


const RideForm = ({ viewport, setViewport, history }) => {
  const [journey, dispatchJourney] = useContext(JourneyContext);
  const [authToken, setAuthToken, userInfo, setUserInfo] = useContext(UserContext);
  const [disabled, setDisabled] = useState(false);

  // const disable = () => {
  //   setTimeout(setDisabled())
  // }

  const onClick = () => {
    if (authToken) return history.push('/request');

    return history.push('/login');
  }

  return (
    <div className='contain'>
      <div className='form'>
        <h2>Request a Ride Now</h2>
        <SearchBar viewport={viewport} setViewport={setViewport} />
        <Space>
          <Button type="primary" onClick={onClick}>
            Request now
        </Button>
          <Button type="primary" htmlType="submit">
            Schedule for later
        </Button>
        </Space>
      </div>
    </div>
  );
}

export default RideForm;