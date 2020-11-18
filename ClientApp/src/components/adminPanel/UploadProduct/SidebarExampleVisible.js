import React from 'react'
import { Header, Icon, Image, Menu, Segment, Sidebar } from 'semantic-ui-react'
import { Route } from 'react-router';
import { Link } from 'react-router-dom';
import MensItem from './Categories/MenCategory';

let select="upload";

const SidebarExampleVisible = () => (
  <Sidebar.Pushable as={Segment}>
    <Sidebar
      as={Menu}
      animation='overlay'
      icon='labeled'
      inverted
      vertical
      visible
      width='thin'
           
        >


      <Menu.Item  as='a'>
                
        <Icon name='home' />
        Home
      </Menu.Item>


        <Link to="/MenstItem1"> <Menu.Item as='a'>
        <Icon name='gamepad' />
        Games
      </Menu.Item>

        </Link>
      <Menu.Item as='a'>
        <Icon name='camera' />
        Channels
      </Menu.Item>

       <Menu.Item as='a'>
       <Icon name='camera' />
        Channels
      </Menu.Item>

      <Menu.Item as='a'>
      <Icon name='camera' />
        Channels
      </Menu.Item>

    </Sidebar>

      <Sidebar.Pusher style={{paddingLeft:'300px', backgroundColor:'red', height:'100vh'}}>
      <Segment basic>
        <Header as='h3'>Application Content</Header>
               
      </Segment>
    </Sidebar.Pusher>
  </Sidebar.Pushable>
)



export default SidebarExampleVisible