import React, { useState, useContext } from 'react';
import { AutoComplete, Form } from 'antd';
import _ from 'lodash';

import { MAPBOX_SEARCH_PARAMS, MAPBOX_URL } from '../../../utils/constants/constants';
import JourneyContext from '../../contexts/JourneyContext';

const SearchBar = () => {
  const [journey, dispatchJourney] = useContext(JourneyContext);
  const [values, setValues] = useState([]);
  const [value, setValue] = useState('');
  const [options, setOptions] = useState([]);

  const onSearch = async (searchText) => {
    let cities;
    if (searchText) {
      const res = await fetch(`${MAPBOX_URL}/${searchText}${MAPBOX_SEARCH_PARAMS}${process.env.REACT_APP_MAPBOX_TOKEN}`)
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
    dispatchJourney({
      type: "start",
      payload: { field: "start", value: start },
    });
  };

  const onEndSelect = (data) => {
    const end = values.find(city => data === city.value)
    dispatchJourney({
      type: "end",
      payload: { field: "end", value: end },
    });
  };

  const onChange = (data) => {
    setValue(data);
  };

  return (
    <>
      <Form.Item>
        <AutoComplete
          options={options}
          allowClear={true}
          style={{
            width: 200,
          }}
          onSelect={onStartSelect}
          onSearch={_.debounce(onSearch, 500)}
          placeholder="Enter a pickup location"
          filterOption={(inputValue, option) =>
            option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
          }
        />
      </Form.Item>
      <Form.Item>
        <AutoComplete
          value={value}
          options={options}
          style={{
            width: 200,
          }}
          onSelect={onEndSelect}
          onSearch={_.debounce(onSearch, 500)}
          onChange={onChange}
          placeholder="Enter destination"
          filterOption={(inputValue, option) =>
            option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
          }
        />
      </Form.Item>
    </>
  );
};

export default SearchBar;