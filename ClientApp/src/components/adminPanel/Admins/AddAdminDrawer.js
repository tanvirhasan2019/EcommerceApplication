import React from 'react';
import {
    Button, ButtonToolbar, RadioGroup, IconButton, Drawer, Radio, Icon
} from 'rsuite';
import AddBoxIcon from '@material-ui/icons/AddBox';

import Paper from '@material-ui/core/Paper';
import { toaster } from 'evergreen-ui'
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

import authService from '../../api-authorization/AuthorizeService';


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
    this.HandleSubmit = this.HandleSubmit.bind(this);

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
        //console.log('USER FROM role name  ', role)
    }

    handleClaims(claims) {
        this.setState({ claims: claims })
        //console.log('USER SELECTED CLAIMS  ', claims)
    }

    async HandleSubmit() {

        console.log('HANDLE SUBMIT')
        console.log('SUBMIT DATA Claims', this.state.claims)
        console.log('SUBMIT DATA Role', this.state.rolename)
        console.log('SUBMIT DATA user', this.state.user)



        //
        if (this.state.claims != null && this.state.rolename != null && this.state.user != null)
        {


            const token = await authService.getAccessToken();
            console.log("Token Data here : " + token);

            fetch('Admin/CreateRole', {
                method: 'POST', // or 'PUT'
                headers: !token ? {} : {
                    'Content-Type': 'application/json; charset=utf-8', 'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({

                    'userid': this.state.user.id,
                    'rolename': this.state.rolename,
                    'claims': this.state.claims

                }),
            })
                .then(response => response.json())
                .then(Response => {
                    toaster.success(
                        '' + Response.status
                    )
                    console.log('Success:', Response);
                    if (Response.statusCode == 200) {
                        

                    }

                })
                .catch((error) => {

                    console.error('Error:', error);
                    toaster.danger(
                        'Something went wrong'
                    )
                });
        }
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
                                    <MaterialButton onClick={this.HandleSubmit} style={{ width: '100%' }} variant="contained" color="secondary">
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

