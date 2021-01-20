import React, { useState, useContext } from 'react';
import { AutoComplete, Form, Input, Button } from 'antd';
import { FlyToInterpolator } from 'react-map-gl';
import { CloseOutlined } from '@ant-design/icons';
import _ from 'lodash';
import { easeCubic } from 'd3-ease';

import { MAPBOX_SEARCH_PARAMS, MAPBOX_GEOCODING_URL } from '../../../../utils/constants/constants';
import JourneyContext from '../../../contexts/JourneyContext';

const suffix = (
  <CloseOutlined
    style={{
      fontSize: 16,
      color: '#1890ff',
    }}
  />
);

const SearchBar = ({ viewport, setViewport }) => {
  const [journey, dispatchJourney] = useContext(JourneyContext);
  const [values, setValues] = useState([]);
  const [value, setValue] = useState('');
  const [options, setOptions] = useState([]);

  const onSearch = async (searchText) => {
    let cities;
    if (searchText) {
      const res = await fetch(`${MAPBOX_GEOCODING_URL}/${searchText}${MAPBOX_SEARCH_PARAMS}${process.env.REACT_APP_MAPBOX_TOKEN}`)
      const { features } = await res.json();
      cities = features.reduce((acc, curr) => [...acc, { id: curr.id, value: curr.place_name, longitude: curr.center[0], latitude: curr.center[1] }], [])

      setValues(cities);
    }

    setOptions(
      !searchText ? [] : [...cities]
    );
  };

  const onStartSelect = (data) => {
    const start = values.find(city => data === city.value)
    console.log(start)
    dispatchJourney({
      type: "start",
      payload: { field: "start", value: start },
    });
    setOptions(null);
    setViewport({
      ...viewport,
      width: 400,
      height: 400,
      latitude: start.latitude,
      longitude: start.longitude,
      transitionDuration: 5000,
      transitionInterpolator: new FlyToInterpolator(),
      transitionEasing: easeCubic,
      zoom: 13
    })
  };

  const onEndSelect = (data) => {
    const end = values.find(city => data === city.value)
    dispatchJourney({
      type: "end",
      payload: { field: "end", value: end },
    });
    setOptions(null);
    setViewport({
      ...viewport,
      width: 400,
      height: 400,
      latitude: end.latitude,
      longitude: end.longitude,
      transitionDuration: 5000,
      transitionInterpolator: new FlyToInterpolator(),
      transitionEasing: easeCubic,
      zoom: 13
    })
  };

  const onChangeStart = (data) => {
    setValue(prevState => {
      return { ...prevState, start: data };
    });
  };

  const onChangeEnd = (data) => {
    setValue(prevState => {
      return { ...prevState, end: data };
    });
  };

  const clearInput = (e) => {
    if (e === 'start') {
      dispatchJourney({ type: "start", payload: { field: "start", value: null } })
      setValue(prevState => {
        console.log(prevState)
        return { ...prevState, start: "" };
      });
    } else {
      dispatchJourney({ type: "end", payload: { field: "end", value: null } })
      setValue(prevState => {
        console.log(prevState)
        return { ...prevState, end: "" };
      });
    }

  }

  return (
    <>
      <Form.Item>
        <AutoComplete
          value={value.start}
          options={options}
          style={{
            width: 200,
          }}
          onSelect={onStartSelect}
          onSearch={_.debounce(onSearch, 500)}
          onChange={onChangeStart}
          placeholder="Enter a pickup location"
          filterOption={(inputValue, option) =>
            option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
          }
        >
          <Input id="start" suffix={<Button style={{ color: 'black' }} type="link" onClick={() => clearInput('start')}><CloseOutlined /></Button>} />
        </AutoComplete>
      </Form.Item>
      <Form.Item>
        <AutoComplete
          value={value.end}
          options={options}
          style={{
            width: 200,
          }}
          onSelect={onEndSelect}
          onSearch={_.debounce(onSearch, 500)}
          onChange={onChangeEnd}
          placeholder="Enter destination"
          filterOption={(inputValue, option) =>
            option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
          }
        >
          <Input suffix={<Button style={{ color: 'black' }} type="link" onClick={() => clearInput('end')}><CloseOutlined /></Button>} />
        </AutoComplete>
      </Form.Item>
    </>
  );
};

export default SearchBar;