import React, { useContext, useEffect, useState } from 'react';
import { AutoComplete, Card } from 'antd';
import { CaretDownOutlined } from '@ant-design/icons';

import JourneyContext from '../../contexts/JourneyContext';
import { StyledP } from './styles/styles';

const mockVal = (str, repeat = 1) => {
  return {
    value: str.repeat(repeat),
  };
};

const OrderForm = () => {
  const [journey, dispatchJourney] = useContext(JourneyContext);
  const [values, setValues] = useState('');
  const [editAddress, setEditAddress] = useState('');
  const [value, setValue] = useState('');
  const [options, setOptions] = useState([]);

  const onSearch = (searchText) => {
    setOptions(
      !searchText ? [] : [mockVal(searchText), mockVal(searchText, 2), mockVal(searchText, 3)],
    );
  };

  const onSelect = (data) => {
    console.log('onSelect', data);
  };

  const onChange = (data) => {
    setValue(data);
  };

  useEffect(() => {
    if (journey.start && journey.end) {
      setValues({ start: journey.start.value.split(',')[0], end: journey.end.value.split(',')[0] })
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

  return (
    <>
      <Card title={title()} style={{ width: 300, position: 'absolute', marginTop: '100px' }}>
      </Card>
    </>
  )
}

export default OrderForm;