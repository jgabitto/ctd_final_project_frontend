import React from 'react';

import { Tabs } from 'antd';
import { AppleOutlined, AndroidOutlined } from '@ant-design/icons';

const { TabPane } = Tabs;

const LandingPageTabs = () => {
  return (
    <div className='contain'>
      <div className='form'>
        <Tabs defaultActiveKey="2">
          <TabPane
            tab={
              <div>
                <div>
                  <AppleOutlined />
                </div>
                <div>
                  Tab 1
        </div>
              </div>
            }
            key="1"
          >
            Tab 1
    </TabPane>
          <TabPane
            tab={
              <span>
                <AndroidOutlined />
          Tab 2
        </span>
            }
            key="2"
          >
            Tab 2
    </TabPane>
        </Tabs>
      </div>
    </div>
  )
}

export default LandingPageTabs;