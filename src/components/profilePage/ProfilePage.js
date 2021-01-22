import React, { useState, useContext } from 'react';
import { Modal, Form, Input, Button } from 'antd';
import _ from 'lodash';

import { UPDATE } from '../../utils/constants/constants';
import UserContext from '../contexts/UserContext';
import { Section } from './styles.js/styles';

const ProfilePage = () => {
  const [authToken, setAuthToken, userInfo, setUserInfo] = useContext(UserContext);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };


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
    showModal();
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };


  return (
    <>
      { userInfo ?
        <Section>
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
                  label={<strong>First Name</strong>}
                  name='first_name'
                >
                  <Input placeholder='First Name' />
                </Form.Item>
                <Form.Item
                  label={<strong>Last Name</strong>}
                  name='last_name'
                >
                  <Input placeholder='Last Name' />
                </Form.Item>
                <Form.Item
                  label={<strong>Email</strong>}
                  name='email'
                >
                  <Input placeholder='Email' />
                </Form.Item>
                <Form.Item
                  label={<strong>Phone</strong>}
                  name='phone'
                >
                  <Input placeholder='Phone' />
                </Form.Item>
                <Form.Item
                  label={<strong>New Password</strong>}
                  name='password'
                >
                  <Input.Password placeholder='New password' />
                </Form.Item>
                <Form.Item
                  label={<strong>Confirm Password</strong>}
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

          <Modal cancelButtonProps={{ style: { display: 'none' } }} title="User was updated successfully!" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
            <p>Click ok to close modal.</p>
          </Modal>
        </Section>
        : null}
    </>
  );
}

export default ProfilePage;