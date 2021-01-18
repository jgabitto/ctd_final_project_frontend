import React from 'react';
import { Form, Button } from 'antd';

import SearchBar from './searchBar/SearchBar';


const layout = {
  labelCol: {
    span: 12,
  },
  wrapperCol: {
    span: 12,
  },
};

const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

const RideForm = ({ viewport, setViewport, history }) => {

  const onFinish = (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form
      {...layout}
      name="basic"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      {/* <Form.Item
        name="username"
        rules={[
          {
            required: true,
            message: 'Please input your username!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
      >
        <Input.Password />
      </Form.Item> */}
      <SearchBar viewport={viewport} setViewport={setViewport} />
      <Form.Item {...tailLayout}>
        <Button type="primary" onClick={() => history.push('/request')}>
          Request now
        </Button>
      </Form.Item>
      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Schedule for later
        </Button>
      </Form.Item>
    </Form>
  );
}

export default RideForm;