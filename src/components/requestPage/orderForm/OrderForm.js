import React, { useContext, useEffect, useState } from 'react';
import { List, Avatar, Card, DatePicker, TimePicker, Row, Col } from 'antd';
import { CaretDownOutlined } from '@ant-design/icons';
import _ from 'lodash';

import { REQUEST_RIDE } from '../../../utils/constants/constants';
import JourneyContext from '../../contexts/JourneyContext';
import UserContext from '../../contexts/UserContext';
import { StyledP, StyledButton, StyledDiv, StyledContainer } from './styles/styles';
import Item from 'antd/lib/list/Item';

const data = [
  {
    title: 'Ant Design Title 1',
  },
  {
    title: 'Ant Design Title 2',
  },
  {
    title: 'Ant Design Title 3',
  },
  {
    title: 'Ant Design Title 4',
  },
];

const urls =
{
  'suv': 'https://d3i4yxtzktqr9n.cloudfront.net/hulk/522b1d9c18507374f9494b42f2b6fc3e.png',
  'van': 'https://d3i4yxtzktqr9n.cloudfront.net/hulk/522b1d9c18507374f9494b42f2b6fc3e.png',
  'sports': 'https://d3i4yxtzktqr9n.cloudfront.net/hulk/855c2957609f0a7a333f9d4affc31e5b.png',
  'luxury': 'https://d3i4yxtzktqr9n.cloudfront.net/hulk/855c2957609f0a7a333f9d4affc31e5b.png',
  'coupe': 'https://d3i4yxtzktqr9n.cloudfront.net/hulk/09e8f38cfd86e553f06a6dfd121aec0e.png',
  'sedan': 'https://d3i4yxtzktqr9n.cloudfront.net/hulk/09e8f38cfd86e553f06a6dfd121aec0e.png',
  'hatchback': 'https://d3i4yxtzktqr9n.cloudfront.net/hulk/09e8f38cfd86e553f06a6dfd121aec0e.png'
}
const urls2 =
{
  'suv': "Just like your mom's old van. Oh isn't nostalgia great?",
  'van': "Just like your mom's old van. Oh isn't nostalgia great?",
  'sports': "This car is the fastest car ever created. You have been warned.",
  'luxury': "This car is so fancy that it comes with truffles and jeff bezos.",
  'coupe': "Just like your dad's old car. Oh good times.",
  'sedan': "Nothing to be said about this.",
  'hatchback': "This speeddemon is faster than you think."
}

const OrderForm = () => {
  const [journey, dispatchJourney] = useContext(JourneyContext);
  const [authToken, setAuthToken, userInfo, setUserInfo] = useContext(UserContext);
  const [drivers, setDrivers] = useState();
  const [values, setValues] = useState('');
  const [clickedDiv, setClickedDiv] = useState({});
  const [clickedDivTrue, setClickedDivTrue] = useState(false);
  const [selectedRide, setSelectedRide] = useState(null);
  const [hideList, setHideList] = useState(null);
  const [rideTime, setRideTime] = useState(null);
  const [rideDate, setRideDate] = useState(null);

  // const onSelect = (data) => {
  //   console.log('onSelect', data);
  // };

  // const onChange = (data) => {
  //   setValue(data);
  // };

  useEffect(() => {
    if (journey.start && journey.end) {
      setValues({ start: journey.start.value.split(',')[0], end: journey.end.value.split(',')[0] })
    }

    if (journey.drivers) {
      const data = journey.drivers.reduce((acc, curr) => {
        console.log(curr.user)
        return [...acc, { ...curr.user.driver.cars[0], latitude: curr.latitude, longitude: curr.longitude, location: curr.location }];
      }, []);
      setDrivers(data);

      const ids = data.reduce((acc, curr) => {
        return { ...acc, [curr.id]: false }
      }, {})

      setClickedDiv(ids);
    }
  }, [journey])

  const onClickLocation = (value) => {
    setValues(prevState => {
      return { ...prevState, ...{ [value]: values[value] } }
    })
  }

  const onClickDiv = (value) => {
    setClickedDiv(prevState => {
      let newObj = { ...prevState };
      newObj = _.mapValues(newObj, () => false);
      return { ...newObj, [value]: true };
    })
    setClickedDivTrue(true);
    setSelectedRide(value)
  }

  const selectRide = async () => {
    let found = drivers.find(driver => driver.id === selectedRide);
    found = { ...found, ...rideTime, ...rideDate }

    const ride = {
      user_id: userInfo.id,
      driver_id: found.driver_id,
      latitude: found.latitude,
      longitude: found.longitude,
      end_latitude: journey.end.latitude,
      end_longitude: journey.end.longitude,
      request_start_time: found.time,
      gps_starting_point: `${journey.start.latitude}, ${journey.start.longitude}`,
      starting_address: journey.start.value,
      end_address: journey.end.value
    }
    console.log(ride)
    dispatchJourney({
      type: 'ride',
      payload: { field: 'ride', value: ride },
    });

    const data = await fetch(REQUEST_RIDE, {
      method: 'POST',
      mode: 'cors',
      credentials: 'include',
      body: JSON.stringify(ride),
      headers: { 'Content-Type': 'application/json', 'Authorization': `${authToken}` }
    });

    const res = await data.json();

    setHideList(true);
  }

  const onChangeDate = (date, dateString) => {
    console.log(date, dateString);
    setRideDate({ date: date, dateString: dateString })
  }

  const onChangeTime = (time, timeString) => {
    console.log(time, timeString);
    setRideTime({ time: time, timeString: timeString })
  }

  const title = () => {
    return (
      <>
        <StyledP onClick={() => onClickLocation('start')}>From {values.start} <CaretDownOutlined /></StyledP>
        <StyledP onClick={() => onClickLocation('end')}>To {values.end} <CaretDownOutlined /></StyledP>
        <DatePicker onChange={onChangeDate} />
        <TimePicker use12Hours format="h:mm a" onChange={onChangeTime} />
      </>
    )
  }

  console.log(drivers)

  return (
    <>
      <Card title={hideList ? <em><strong>Your request has been received!</strong></em> : title()} style={hideList ? { textAlign: 'center', width: 400, position: 'absolute', marginTop: '100px', padding: 0 } : { width: 400, position: 'absolute', marginTop: '100px', padding: 0 }}>
        {
          drivers ?
            <List
              style={hideList
                ? { display: 'none' }
                : {
                  overflow: 'auto',
                  height: '200px'
                }}
              itemLayout="horizontal"
              dataSource={drivers}
              renderItem={item => {
                return (
                  <StyledContainer>
                    <List.Item onClick={() => onClickDiv(item.id)} className={clickedDiv[item.id] ? 'clicked' : null}>
                      <List.Item.Meta
                        avatar={<Avatar size={75} src={urls[item.car_type]} />}
                        title={item.car_type}
                        description={urls2[item.car_type]}
                      />
                    </List.Item >
                  </StyledContainer>
                )
              }}
            /> : null
        }
        <Row>
          <Col span={12} offset={6}>
            <div style={hideList ? { display: 'none' } : { margin: '10px 0' }}>
              <StyledButton onClick={selectRide} disabled={clickedDivTrue && rideDate && rideTime ? null : true}>Request Rideshare</StyledButton>
            </div>
            {/* </div> */}
          </Col>
        </Row>
      </Card>
    </>
  )
}

export default OrderForm;