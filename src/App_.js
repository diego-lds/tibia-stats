import React, { useState, useEffect } from 'react';
import AutoComplete from './components/AutoComplete'
import CardCreature from './components/CardCreature';
import axios from 'axios';

import { Layout, Typography, Menu } from 'antd';

import {
    DollarCircleOutlined,
    SettingOutlined 
  } from '@ant-design/icons';

import './App.css';
import SubMenu from 'antd/lib/menu/SubMenu';

import Chart from './components/Chart'


const { Header, Footer, Sider, Content } = Layout;
const { Title } = Typography;




function App() {
  const [key, setKey] = useState('loot');
  const [creatures, setCreatures] = useState([])
  const [creatureLoot, setCreatureLoot] = useState({})

  useEffect(() => {
    async function fetchData() {
      const response = await axios('https://tibiawiki.dev/api/creatures');
      setCreatures(response.data);
      console.log('DONE!', response.data.length)
    }

    fetchData();
  }, []);

  const handleClick = e => {
    setKey(e.key);
  };

  async function getCreatureLoot(creature) { 
    const response = await axios(`https://tibiawiki.dev/api/v2/loot/${creature}`);
 
    setCreatureLoot(response.data);
  } 

  const handleSelect = value => {
    getCreatureLoot(value)
  }

  const renderLootStatistics = () => {
    const loot = creatureLoot.loot2;
    if(loot){
        return (
        <div className="loot-container">
           <CardCreature
                name={loot.name}
              />
              <Chart data={loot}/>
        </div>
      )
    }else{
      return null;
    }
  }

  const renderContent = key => {
    if(key === 'loot'){
      return (
        creatures.length > 0  && (
          <div className="loot-content">
            <div className="column-search">
            <AutoComplete 
              data={creatures}
              onSelect={handleSelect}
               />
            </div>
            <div className="column-display">
              {renderLootStatistics()}
            </div>
          </div>
        )
      )
    }
  }

  return (
      <div className="App">
      <Layout >
        <Header style={{background:"#eeeeee", height: 100}}>
          <div className="logo-header">
            <img src="/assets/Tibia_logo.png" alt="" width="130" height="80"/>
          </div>
        </Header>
        <Layout>
          <Sider>
            <Menu
              onClick={handleClick}
              mode="inline"
              defaultSelectedKeys={['loot']}
            >
              <Menu.Item key="Dashboard">
                <div>
                  DASHBOARD
                </div>
              </Menu.Item>
              <Menu.Item 
                key="loot" 
                icon={<DollarCircleOutlined />}
              >
                Creatures / Loot
              </Menu.Item>
               <Menu.Item 
                key="creatures" 
                icon={<DollarCircleOutlined />}
              >
                Creatures
              </Menu.Item>
              <SubMenu
                title={
                  <span>
                    <SettingOutlined />
                    <span>Navigation dois</span>
                  </span>
                }
              >
                <Menu.ItemGroup
                  title="TESTE"
                >
                  <Menu.Item>ITEM 1</Menu.Item>
                  <Menu.Item>ITEM 2</Menu.Item>
                  <Menu.Item>ITEM 3</Menu.Item>
                </Menu.ItemGroup>
              </SubMenu>
            </Menu>
          </Sider>
          <Content>
            <div  style={{ padding: 0, minHeight: 380 }}>
              {renderContent(key)}
            </div>
          </Content>
        </Layout>
        <Footer>Footer</Footer>
      </Layout>
      </div>
    );
}

export default App;
