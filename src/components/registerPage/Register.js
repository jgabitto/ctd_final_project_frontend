import React, { useState, useContext } from 'react';
import { Tabs } from 'antd';

import * as ROUTES from '../../utils/constants/routes';
import { LOGIN } from '../../utils/constants/constants';
import { Section } from './styles/styles';
// import ForgotPassword from './ForgotPassword';
import UserContext from '../contexts/UserContext';
import RiderRegister from './riderRegister/RiderRegister';
import DriverRegister from './driverRegister/DriverRegister';

const { TabPane } = Tabs;

const Register = ({ history }) => {
  const [loginState, setLoginState] = useState({ error: null, loading: null });
  const { error, loading } = loginState;
  const [authToken, setAuthToken] = useContext(UserContext);

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
        // 	// Update auth context with jwt
        setAuthToken(res);
        // 	// Switch to home page
        history.push(`${ROUTES.HOME_PAGE}`);
      } else {
        setLoginState({ error: res.info.message, loading: false });
      }
    } catch (e) {
      console.log(e.message);
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
        {/* <h1>
        Welcome to CTD's School
				<span className='span-txt'>This website is your main hub for class materials for Code the Dream’s classes.</span>
      </h1> */}

        <div className='form'>
          <h2>Register</h2>
          <Tabs defaultActiveKey="1" centered>
            {/* <h2>Sign In</h2> */}
            {
              authToken ?
                <div>
                  You are signed in
				      </div>
                :
                <>
                  <TabPane tab="Let's ride" key="1">
                    <div className='col-10 mx-auto'>
                      <RiderRegister loading={loading} loginState={loginState} error={error} onFinish={onFinish} fetchData={fetchData} />
                    </div>
                  </TabPane>
                  <TabPane tab="Let's drive" key="2">
                    <div className='col-10 mx-auto'>
                      <DriverRegister loading={loading} loginState={loginState} error={error} onFinish={onFinish} fetchData={fetchData} />
                    </div>
                  </TabPane>
                </>
            }
          </Tabs>
        </div>
      </div>
    </Section>
  );
};
export default Register;
