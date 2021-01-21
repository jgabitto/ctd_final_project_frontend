import React, { useContext, useEffect, useState } from 'react';
import { List, Avatar, Card } from 'antd';
import { CaretDownOutlined } from '@ant-design/icons';

import JourneyContext from '../../contexts/JourneyContext';
import { StyledP } from './styles/styles';

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
  'sports': 'https://d3i4yxtzktqr9n.cloudfront.net/hulk/855c2957609f0a7a333f9d4affc31e5b.png',
  'luxury': 'https://d3i4yxtzktqr9n.cloudfront.net/hulk/855c2957609f0a7a333f9d4affc31e5b.png',
  'coupe': 'https://d3i4yxtzktqr9n.cloudfront.net/hulk/09e8f38cfd86e553f06a6dfd121aec0e.png'
}

const OrderForm = () => {
  const [journey, dispatchJourney] = useContext(JourneyContext);
  const [drivers, setDrivers] = useState();
  const [values, setValues] = useState('');


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
    }
  }, [journey])

  const onClick = (value) => {
    console.log({ [value]: values[value] })
    setValues(prevState => {
      return { ...prevState, ...{ [value]: values[value] } }
    })
  }

  const title = () => {
    return (
      <>
        <StyledP onClick={() => onClick('start')}>From {values.start} <CaretDownOutlined /></StyledP>
        <StyledP onClick={() => onClick('end')}>To {values.end} <CaretDownOutlined /></StyledP>
      </>
    )
  }
  console.log(drivers)
  return (
    <>
      <Card title={title()} style={{ width: 300, position: 'absolute', marginTop: '100px' }}>
        {
          drivers ?
            <List
              style={{
                overflow: 'auto',
                height: '200px'
              }}
              itemLayout="horizontal"
              dataSource={drivers}
              renderItem={item => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar size={75} src={urls[item.car_type]} />}
                    title={item.car_type}
                    description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                  />
                </List.Item>
              )}
            /> : null
        }
      </Card>
    </>
  )
}

export default OrderForm;