import React, { useContext } from 'react';
import { Form, Input, Button } from 'antd';
import _ from 'lodash';

import UserContext from '../contexts/UserContext';
import ForgotPassword from '../loginPage/forgotPassword/ForgotPassword';

const ProfilePage = () => {
  const [authToken, setAuthToken, userInfo, setUserInfo] = useContext(UserContext);

  const onFinish = (values) => {
    console.log('Success:', values);
    values = _.pickBy(values, _.identity);
    console.log(values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };


  return (
    <>
      <div style={{ width: '100%', marginTop: '50px' }} className='col-4 contain'>
        <div className='form-profile'>
          <h2>Profile</h2>
          <Form
            name='normal_login'
            className='login-form'
            initialValues={userInfo ? userInfo : null}
            onFinish={onFinish}
          >
            <Form.Item
              label="First Name"
              name='first_name'
            >
              <Input placeholder='First Name' />
            </Form.Item>
            <Form.Item
              label="Last Name"
              name='last_name'
            >
              <Input placeholder='Last Name' />
            </Form.Item>
            <Form.Item
              label="Email"
              name='email'
            >
              <Input placeholder='Email' />
            </Form.Item>
            <Form.Item
              label="Phone"
              name='phone'
            >
              <Input placeholder='Phone' />
            </Form.Item>
            <Form.Item
              label="New Password"
              name='password'
            >
              <Input.Password placeholder='New password' />
            </Form.Item>
            <Form.Item
              label="Confirm Password"
              name='confirm_password'
              rules={[
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }

                    return Promise.reject('The two passwords that you entered do not match!');
                  },
                }),
              ]}
            >
              <Input.Password placeholder='Password' />
            </Form.Item>
            <Form.Item>
              <div className='login-form-forgot'>
                {/* <ForgotPassword /> */}
              </div>
            </Form.Item>
            <Form.Item>
              <Button type='primary' htmlType='submit' className='login-form-button button-hover' id='validating'>
                Save Changes
							</Button>
            </Form.Item>
          </Form>
        </div>
      </div>
      {/* <div className="contain">
        <div className="form">
          <Form
            {...layout}
            initialValues={{
              remember: true,
            }}
          >
            <Form.Item label="Field A">
              <Input placeholder="input placeholder" />
            </Form.Item>
            <Form.Item label="Field B">
              <Input placeholder="input placeholder" />
            </Form.Item>
            <Form.Item {...tailLayout}>
              <Button type="primary">Submit</Button>
            </Form.Item>
          </Form>
        </div>
      </div> */}
    </>
  );
}

export default ProfilePage;