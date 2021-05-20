import React from 'react';
import {
    Button, ButtonToolbar, RadioGroup, IconButton, Drawer, Radio, Icon
} from 'rsuite';
import AddBoxIcon from '@material-ui/icons/AddBox';

import Paper from '@material-ui/core/Paper';

import Fab from '@material-ui/core/Fab';
import NavigationIcon from '@material-ui/icons/Navigation';
import { Typography } from '@material-ui/core';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import InputAdornment from '@material-ui/core/InputAdornment';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MaterialButton from '@material-ui/core/Button'
import FastfoodIcon from '@material-ui/icons/Fastfood';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';


import Asynchronous from './Asynchronous'
import RoleSelect from './RoleSelect'
import TransferList from './TransferList';



export class AddAdminDrawer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        size: 'lg',
        show: false,
        data: [],
        user: null,
        rolename: null,
        claims : null

    };
    this.close = this.close.bind(this);
    this.toggleDrawer = this.toggleDrawer.bind(this);
    this.handleChangeSize = this.handleChangeSize.bind(this);
      this.handleEmail = this.handleEmail.bind(this);
      this.handleRole = this.handleRole.bind(this);

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

    handleEmail(user) {
        this.setState({ user })
       // console.log('USER FROM ASYNC INPUT email is ', { user })
    }

    handleRole(role) {
        this.setState({ rolename: role })
        console.log('USER FROM role name  ', role)
    }

    handleClaims(claims) {
        this.setState({ claims: claims })
        console.log('USER SELECTED CLAIMS  ', claims)
    }

    render() {
        const { size, placement, show } = this.state;
       
    return (
      <div>
           

        <Button onClick={()=>this.toggleDrawer('left')} variant="contained">
            <AddBoxIcon />
        </Button>


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
                    <Drawer.Title style={{ textAlign: 'center' }}>
                        <Typography variant="h5" gutterBottom>
                            <AccountCircleIcon/> &nbsp; &nbsp; ADD NEW ADMIN
                        </Typography>
                    </Drawer.Title>
          </Drawer.Header>
          <Drawer.Body>

                    <Paper variant="outlined" elevation={3} >

                        <div className="container">
                         
                            <div className="row">
                                <div className="col-md-6 col-sm-12">
                                    <FormControl style={{ width: '100%'}}>
                                        <Asynchronous handleEmail={(props) => this.handleEmail(props)}/> 
                                    </FormControl>
                                </div>
                                <div className="col-md-6 col-sm-12">
                                    <FormControl style={{ width: '100%', marginTop:'16px'}}>
                                        <RoleSelect handleRole={(props) => this.handleRole(props)}/>
                                    </FormControl>
                                </div>
                                

                            </div>

                            <div className="row">

                                <div className="col-12">
                                    <FormControl style={{ width: '100%', marginTop: '10px' }}>
                                        <TransferList handleClaims={(props) => this.handleClaims(props)} />
                                    </FormControl>
                                </div>

                            </div>

                            <div className="row">

                                <div className="col-12" style={{ marginTop: '20px', marginBottom: '10px' }}>
                                    <MaterialButton onClick={this.AccountLockHandle} style={{ width: '100%' }} variant="contained" color="secondary">
                                             SAVE                                      
                                    </MaterialButton>
                                </div>

                            </div>



                        </div>
                    </Paper>
              

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

