import React from 'react';

import { Button, Form, Input } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

const DriverLogin = ({ loading, error, loginState, onFinish, fetchData }) => {
  return (
    <>
      <Form
        name='normal_login'
        className='login-form'
        initialValues={{
          remember: true
        }}
        onFinish={onFinish}
      >
        <Form.Item
          name='email'
          rules={[
            {
              required: true,
              type: 'email',
              message: 'Enter a valid email address'
            }
          ]}
          help={error ? error.error : null}
          hasFeedback
          validateStatus={loading ? 'validating' : null}
        >
          <Input prefix={<UserOutlined className='site-form-item-icon' />} placeholder='email' />
        </Form.Item>
        <Form.Item
          name='password'
          rules={[
            {
              required: true,
              message: 'Enter your password'
            }
          ]}
          hasFeedback
          validateStatus={loading ? 'validating' : null}
        >
          <Input prefix={<LockOutlined className='site-form-item-icon' />} type='password' placeholder='password' />
        </Form.Item>
        <Form.Item>
          <div className='login-form-forgot'>
            {/* <ForgotPassword /> */}
          </div>
        </Form.Item>
        <Form.Item>
          <Button type='primary' htmlType='submit' className='login-form-button button-hover' id='validating'>
            Login
							</Button>
        </Form.Item>
      </Form>
      <div align="center" style={{ color: "red" }}>
        {loginState.error ? loginState.error : null}
      </div>
    </>
  )
}

export default DriverLogin;