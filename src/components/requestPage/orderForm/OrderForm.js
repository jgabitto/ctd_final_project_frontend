import React, { useContext, useEffect, useState } from 'react';
import { List, Avatar, Card, Button, Row, Col } from 'antd';
import { CaretDownOutlined } from '@ant-design/icons';
import _ from 'lodash';

import JourneyContext from '../../contexts/JourneyContext';
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

const OrderForm = () => {
  const [journey, dispatchJourney] = useContext(JourneyContext);
  const [drivers, setDrivers] = useState();
  const [values, setValues] = useState('');
  const [clickedDiv, setClickedDiv] = useState({});
  const [clickedDivTrue, setClickedDivTrue] = useState(false);
  const [selectedRide, setSelectedRide] = useState(null);


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

  const selectRide = () => {
    const found = drivers.find(driver => driver.id === selectedRide);
    console.log(found)
    dispatchJourney({
      type: 'ride',
      payload: { field: 'ride', value: found },
    });
  }

  const title = () => {
    return (
      <>
        <StyledP onClick={() => onClickLocation('start')}>From {values.start} <CaretDownOutlined /></StyledP>
        <StyledP onClick={() => onClickLocation('end')}>To {values.end} <CaretDownOutlined /></StyledP>
      </>
    )
  }

  console.log(drivers)

  return (
    <>
      <Card title={title()} style={{ width: 400, position: 'absolute', marginTop: '100px', padding: 0 }}>
        {
          drivers ?
            <List
              style={{
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
                        description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                      />
                    </List.Item >
                  </StyledContainer>
                )
              }}
            /> : null
        }
        {/* <div style={{ height: '50px' }}><div style={}><Button>Hello</Button></div></div> */}
        <Row>
          <Col span={12} offset={6}>
            {/* <div style={{ display: 'inline-flex', justifyContent: 'center', alignItems: 'center' }}> */}
            <div style={{ margin: '10px 0' }}>
              <StyledButton onClick={selectRide} disabled={clickedDivTrue ? null : true}>Request Rideshare</StyledButton>
            </div>
            {/* </div> */}
          </Col>
        </Row>
      </Card>
    </>
  )
}

export default OrderForm;