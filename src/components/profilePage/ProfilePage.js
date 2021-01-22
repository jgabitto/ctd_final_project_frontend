import React, { useContext } from 'react';
import { Form, Input, Button } from 'antd';
import _ from 'lodash';

import { UPDATE } from '../../utils/constants/constants';
import UserContext from '../contexts/UserContext';
import ForgotPassword from '../loginPage/forgotPassword/ForgotPassword';

const ProfilePage = () => {
  const [authToken, setAuthToken, userInfo, setUserInfo] = useContext(UserContext);

  const onFinish = async (values) => {
    values = _.pickBy(values, _.identity);
    const res = await fetch(UPDATE, {
      method: 'PUT',
      mode: 'cors',
      credentials: 'include',
      body: JSON.stringify(values),
      headers: { 'Content-Type': 'application/json', 'Authorization': `${authToken}` }
    })
    const data = await res.json();

    setUserInfo(data);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };


  return (
    <>
      { userInfo ?
        <div style={{ width: '100%', marginTop: '50px' }} className='col-4 contain'>
          <div className='form-profile'>
            <h2>Profile</h2>
            <Form
              name='normal_login'
              className='login-form'
              initialValues={userInfo}
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
        : null}
    </>
  );
}

export default ProfilePage;