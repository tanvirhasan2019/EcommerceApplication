import React from 'react';
import {
    Button, ButtonToolbar, RadioGroup, IconButton, Drawer, Radio, Icon
} from 'rsuite';


import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import NavigationIcon from '@material-ui/icons/Navigation';




export  class DrawerItem extends React.Component {
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
          <Drawer.Header>
            <Drawer.Title>UPDATE ORDER ITEM</Drawer.Title>
          </Drawer.Header>
          <Drawer.Body>

       

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

/* <ButtonToolbar>
    <IconButton
        icon={<Icon icon="angle-right" />}
        onClick={() => this.toggleDrawer('left')}
    >
        Left
          </IconButton>

</ButtonToolbar> */