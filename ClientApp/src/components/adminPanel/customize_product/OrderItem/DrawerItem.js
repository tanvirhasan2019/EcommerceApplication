import React from 'react';
import {
    Button, ButtonToolbar, RadioGroup, IconButton, Drawer, Radio, Icon
} from 'rsuite';

import { toaster } from 'evergreen-ui';
import Fab from '@material-ui/core/Fab';
import NavigationIcon from '@material-ui/icons/Navigation';
import authService from '../../../api-authorization/AuthorizeService';
import ScrollableTabsButtonPrevent from './Tabs/ScrollableTabsButtonPrevent';


export class DrawerItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      size: 'lg',
      show: false
    };
    this.close = this.close.bind(this);
    this.toggleDrawer = this.toggleDrawer.bind(this);
    this.handleChangeSize = this.handleChangeSize.bind(this);
  }
  close() {
    this.setState({
      show: false
    });
  }
  toggleDrawer(placement) {
    this.setState({
      placement,
      show: true
    });
  }
  handleChangeSize(size) {
    this.setState({ size });
  }
    render() {
        const { size, placement, show } = this.state;
        console.log('DRAWER')
        console.log(' ', this.props.data)
    return (
      <div>
           

         <Fab onClick={() => this.toggleDrawer('left')} variant="extended" color="primary" aria-label="add">
                <NavigationIcon  />
                  UPDATE
         </Fab>

        <Drawer
          size={size}
          placement={placement}
          show={show}
          onHide={this.close}
        >
                <Drawer.Header style={{
                    width: '90%', height: '50px',
                    textAlign:'center'
                }}>
                    <Drawer.Title style={{textAlign:'center'}}>UPDATE ORDER ITEM</Drawer.Title>
          </Drawer.Header>
          <Drawer.Body>

               <div className="container-fluid">
                       <ScrollableTabsButtonPrevent />
               </div>  

          </Drawer.Body>
          <Drawer.Footer>
            <Button onClick={this.close} appearance="primary">
              Confirm
            </Button>
            <Button onClick={this.close} appearance="subtle">
              Cancel
            </Button>
          </Drawer.Footer>
        </Drawer>
      </div>
    );
  }
}

