import React, { useState, useEffect, useContext } from 'react';
import { Table, Button, Space } from 'antd';
import moment from 'moment';
import { SearchOutlined } from '@ant-design/icons';

import { GET_RIDES } from '../../utils/constants/constants';
import UserContext from '../contexts/UserContext';

// const data = [
//   {
//     key: '1',
//     name: 'John Brown',
//     age: 32,
//     address: 'New York No. 1 Lake Park',
//   },
//   {
//     key: '2',
//     name: 'Jim Green',
//     age: 42,
//     address: 'London No. 1 Lake Park',
//   },
//   {
//     key: '3',
//     name: 'Joe Black',
//     age: 32,
//     address: 'Sidney No. 1 Lake Park',
//   },
//   {
//     key: '4',
//     name: 'Jim Red',
//     age: 32,
//     address: 'London No. 2 Lake Park',
//   },
// ];

const TripsPage = () => {
  const [authToken, setAuthToken, userInfo, setUserInfo] = useContext(UserContext);
  const [data, setData] = useState(null);

  const [state, setState] = useState({
    filteredInfo: null,
    sortedInfo: null,
  });

  useEffect(() => {
    const getData = async () => {
      const data = await fetch(GET_RIDES, {
        method: 'GET',
        mode: 'cors',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json', 'Authorization': `${authToken}` }
      });

      const res = await data.json();

      const trips = res.reduce((acc, curr) => {
        console.log(curr.request_start_time)
        return [...acc, { ...curr, start: moment(curr.request_start_time).format('MMM DD h:mm A') }]
      }, [])
      setData(trips);
    }

    getData();
  }, [])


  const handleChange = (pagination, filters, sorter) => {
    console.log('Various parameters', pagination, filters, sorter);
    setState({
      filteredInfo: filters,
      sortedInfo: sorter,
    });
  };

  const clearFilters = () => {
    setState({ filteredInfo: null });
  };

  const clearAll = () => {
    setState({
      filteredInfo: null,
      sortedInfo: null,
    });
  };

  const setAgeSort = () => {
    setState({
      sortedInfo: {
        order: 'descend',
        columnKey: 'age',
      },
    });
  };

  const columns = () => {
    let { sortedInfo, filteredInfo } = state;
    sortedInfo = sortedInfo || {};
    filteredInfo = filteredInfo || {};

    return (
      [
        {
          title: 'Request Time',
          dataIndex: 'start',
          key: 'start',
          // filters: [
          //   { text: 'Joe', value: 'Joe' },
          //   { text: 'Jim', value: 'Jim' },
          // ],
          // filteredValue: filteredInfo.name || null,
          // onFilter: (value, record) => record.name.includes(value),
          // sorter: (a, b) => a.name.length - b.name.length,
          // sortOrder: sortedInfo.columnKey === 'name' && sortedInfo.order,
          // ellipsis: true,
        },
        {
          title: 'Pickup Address',
          dataIndex: 'starting_address',
          key: 'starting_address',
          // filters: [
          //   { text: 'London', value: 'London' },
          //   { text: 'New York', value: 'New York' },
          // ],
          // filteredValue: filteredInfo.address || null,
          // onFilter: (value, record) => record.address.includes(value),
          // sorter: (a, b) => a.address.length - b.address.length,
          // sortOrder: sortedInfo.columnKey === 'address' && sortedInfo.order,
          // ellipsis: true,
        },
      ]
    )
  }
  console.log(data)
  return (
    <>
      {
        data ?
          <>
            <div className="table-container">
              <div className="table">
                {/* <Space style={{ marginBottom: 16 }}>
                  <Button onClick={setAgeSort}>Sort age</Button>
                  <Button onClick={clearFilters}>Clear filters</Button>
                  <Button onClick={clearAll}>Clear filters and sorters</Button>
                </Space> */}
                <Table columns={columns()} dataSource={data} onChange={handleChange} size="middle" />
              </div>
            </div>
          </>
          : <div className="table-container">
            <div className="table">
              Sorry you do not have a trips history.
          </div>
          </div>
      }
    </>
  );
}

export default TripsPage;