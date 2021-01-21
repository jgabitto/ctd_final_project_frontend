import React, { useState, useEffect, useContext } from 'react';
import { Button, Space } from 'antd';

import SearchBar from './searchBar/SearchBar';
import JourneyContext from '../../contexts/JourneyContext';


const RideForm = ({ viewport, setViewport, history }) => {
  const [journey, dispatchJourney] = useContext(JourneyContext);
  const [disabled, setDisabled] = useState(false);

  // const disable = () => {
  //   setTimeout(setDisabled())
  // }

  return (
    <div className='contain'>
      <div className='form'>
        <h2>Request a Ride Now</h2>
        <SearchBar viewport={viewport} setViewport={setViewport} />
        <Space>
          <Button type="primary" onClick={() => history.push('/request')}>
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