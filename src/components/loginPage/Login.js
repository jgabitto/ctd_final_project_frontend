import React, { useState, useContext } from 'react';
import { Button, Form, Input } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import * as ROUTES from '../../utils/constants/routes';
import { LOGIN } from '../../utils/constants/constants';
import { Section } from './styles/styles';
import UserContext from '../contexts/UserContext';
import JourneyContext from '../contexts/JourneyContext';
import ForgotPassword from './forgotPassword/ForgotPassword';

const Login = ({ history }) => {
  const [loginState, setLoginState] = useState({ error: null, loading: null });
  const { error, loading } = loginState;
  const [authToken, setAuthToken] = useContext(UserContext);
  const [journey, dispatchJourney] = useContext(JourneyContext);

  const onFinish = async (values) => {
    const { email } = values;
    try {
      // Have loading symbol turned on
      setLoginState({ loading: true });
      // Get user information + token
      const res = await fetchData(values);
      // Update state with form values, token, loading=false
      setLoginState({ error: null, loading: false });
      console.log(res)
      // Check if res has jwt
      if (res.token) {
        // Update auth context with jwt
        setAuthToken(res);
        // Switch to request page
        if (journey.start && journey.end) return history.push(`${ROUTES.REQUEST_PAGE}`);
        // Else switch to landing page
        return history.push(`${ROUTES.LANDING_PAGE}`);
      } else {
        setLoginState({ error: 'Invalid credentials', loading: false });
      }
    } catch (e) {
      console.log(e.message);
      setLoginState({ error: 'Invalid credentials', loading: false });
    }
  };

  async function fetchData(values) {
    try {
      const response = await fetch(LOGIN, {
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
        body: JSON.stringify(values),
        headers: { 'Content-Type': 'application/json' }
      });
      const message = await response.json();
      const token = response.headers.get('Authorization');

      return { info: { ...message }, token };
    } catch (e) {
      console.log(e.message);
    }
  }

  return (
    <Section>
      <div style={{ width: '100%', marginTop: '50px' }} className='col-4 contain'>
        <div className='form'>
          <h2>Sign In</h2>
          {
            authToken ?
              <div>
                You are signed in
				      </div>
              :
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
                      <ForgotPassword />
                    </div>
                  </Form.Item>
                  <Form.Item>
                    <Button type='primary' htmlType='submit' className='login-form-button button-hover' id='validating'>
                      Login
							</Button>
                  </Form.Item>
                </Form>
                <div align="center" style={{ color: "red" }}>
                  {error ? error : null}
                </div>
              </>
          }
        </div>
      </div>
    </Section>
  );
};
export default Login;
