import { Tab, Card, Tabs } from 'react-bootstrap';
import { useState } from 'react';
import  TopListForNav  from './navItemsList';
import TopListForNavSecond from './secondNavItemForList';

export function ControlledTabs() {
    return (
      <div className="makeBorderSecond">
          <Tabs justify
            defaultActiveKey="home"
            transition={false}
            id="noanim-tab-example"
            className="mb-3"
            >
              <Tab eventKey="home" title="Список дел №1 - Бытовые / учебные">
                <TopListForNav/>
                
              </Tab>
              <Tab eventKey="profile" title="Список дел №2 - Рабочие">
                  <TopListForNavSecond/>
              </Tab>
          </Tabs>
      </div>
      
    );
  }

  