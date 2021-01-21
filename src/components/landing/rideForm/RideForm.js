import React from 'react';
import { Button, Space } from 'antd';

import SearchBar from './searchBar/SearchBar';


const RideForm = ({ viewport, setViewport, history }) => {


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