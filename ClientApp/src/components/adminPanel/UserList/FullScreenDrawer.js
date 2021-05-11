import React, { Component} from 'react'
import {
    Button, ButtonToolbar, IconButton, Drawer
} from 'rsuite';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { toaster } from 'evergreen-ui';



// @material ui 
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import Fab from '@material-ui/core/Fab';
import NavigationIcon from '@material-ui/icons/Navigation';
import { Typography } from '@material-ui/core';
import PhoneIcon from '@material-ui/icons/Phone';
import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import InputAdornment from '@material-ui/core/InputAdornment';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MaterialButton from '@material-ui/core/Button'
import FastfoodIcon from '@material-ui/icons/Fastfood';
import DeleteIcon from '@material-ui/icons/Delete';


// @ AUTH & TOKEN
import authService from '../../api-authorization/AuthorizeService'


// @ BACK_DROP COMPONENT
import {SimpleBackdrop} from '../../spinner/SimpleBackdrop'





export default class FullScreenDrawer extends React.Component {
    constructor(props) {
        super(props);
        var lock = this.props.data.lockoutEnd ? false : true
        this.state = {
            show: false,
            lockAccount : lock
        };
        this.close = this.close.bind(this);
        this.toggleDrawer = this.toggleDrawer.bind(this);
        this.AccountLockHandle = this.AccountLockHandle.bind(this);
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




  AccountLockHandle = async () => {

            const token = await authService.getAccessToken();
            console.log("Token Data here : " + token);
           
            if(token)
            {   
            
            fetch('Admin/LockUser', {
                method: 'DELETE', // or 'PUT'
                headers: !token ? {} : {
                    'Content-Type': 'application/json; charset=utf-8', 'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({

                    'userid' : this.props.data.id

                }),
            })
                .then(response => response.json())
                .then(Response => {
                    toaster.success(
                        '' + Response.status
                    )
                     if(Response.statusCode == 200){
                       // this.setState({!this.state.lockAccount})
                          this.setState(prevState => ({
                              lockAccount: !prevState.lockAccount
                            }));
                     }
                    console.log('Success:', Response);

                })
                .catch((error) => {

                    console.error('Error:', error);
                    toaster.danger(
                        'Something went wrong trying to create your audience'
                    )
                });




           
        } else {
           
        } 


    };



    render() {

        const { placement, show } = this.state;
        console.log('Full Screen Drawer props ', this.props.data)
        return (
            <div>
                                   
               
                 <Fab onClick={() => this.toggleDrawer('right')} variant="extended" color="primary" aria-label="add">
                    <VisibilityIcon  />                       
                 </Fab>

                <Drawer full placement={placement} show={show} onHide={this.close}>
                    <Drawer.Header>
                        <Drawer.Title> USER DETAILS INFO </Drawer.Title>
                    </Drawer.Header>

                   

                        <Drawer.Body>

                            <Paper  variant="outlined" elevation={3} >

                            <div className="container">


                                <div className="row">

                                    <div className="col-12">
                                        <FormControl style={{ width: '100%', marginTop: '20px' }}>
                                            <InputLabel htmlFor="input-with-icon-adornment">ID</InputLabel>
                                            <Input
                                                id="input-with-icon-adornment"
                                                startAdornment={
                                                    <InputAdornment position="start">
                                                        <AccountCircle />
                                                        &nbsp;{this.props.data.id}
                                                    </InputAdornment>
                                                }
                                            />
                                            </FormControl>
                                      </div>

                                   </div>



                                <div className="row">
                                    <div className="col-md-6 col-sm-12">
                                        <FormControl style={{ width: '100%', marginTop: '10px' }}>
                                            <InputLabel htmlFor="input-with-icon-adornment">EMAIL</InputLabel>
                                            <Input
                                                id="input-with-icon-adornment"
                                                startAdornment={
                                                    <InputAdornment position="start">
                                                        <FastfoodIcon />
                                                    &nbsp; {this.props.data.email}
                                                    </InputAdornment>
                                                }
                                            />
                                        </FormControl>
                                    </div>

                                    <div className="col-md-6 col-sm-12">
                                    <FormControl style={{ width: '100%', marginTop: '10px' }}>
                                        <InputLabel htmlFor="input-with-icon-adornment">PHONE</InputLabel>
                                        <Input
                                            id="input-with-icon-adornment"
                                            startAdornment={
                                                <InputAdornment position="start">
                                                    <AccountCircle />
                                                    &nbsp;{this.props.data.phoneNumber ? this.props.data.phoneNumber : 'NOT GIVEN'}
                                                </InputAdornment>
                                            }
                                        />
                                        </FormControl>
                                    </div>

                                </div>






                                <div className="row">
                                    <div className="col-md-4 col-sm-12">
                                        <FormControl style={{ width: '100%', marginTop: '10px' }}>
                                            <InputLabel htmlFor="input-with-icon-adornment">ACCESS FAILED COUNT</InputLabel>
                                            <Input
                                                id="input-with-icon-adornment"
                                                startAdornment={
                                                    <InputAdornment position="start">
                                                        <FastfoodIcon />
                                                    &nbsp; {this.props.data.accessFailedCount}
                                                    </InputAdornment>
                                                }
                                            />
                                        </FormControl>
                                    </div>

                                    <div className="col-md-4 col-sm-12">
                                        <FormControl style={{ width: '100%', marginTop: '10px' }}>
                                            <InputLabel htmlFor="input-with-icon-adornment">TWO FACTOR</InputLabel>
                                            <Input
                                                id="input-with-icon-adornment"
                                                startAdornment={
                                                    <InputAdornment position="start">
                                                        <AccountCircle />
                                                    &nbsp; {!this.props.data.twoFactorEnabled ? 'FALSE' : 'TRUE'}
                                                    </InputAdornment>
                                                }
                                            />
                                        </FormControl>
                                    </div>



                                    <div className="col-md-4 col-sm-12">
                                        <FormControl style={{ width: '100%', marginTop: '10px' }}>
                                            <InputLabel htmlFor="input-with-icon-adornment">EMAIL CONFIRMED</InputLabel>
                                            <Input
                                                id="input-with-icon-adornment"
                                                startAdornment={
                                                    <InputAdornment position="start">
                                                        <AccountCircle />
                                                    &nbsp;{!this.props.data.emailConfirmed ? 'FALSE' : 'TRUE'}
                                                    </InputAdornment>
                                                }
                                            />
                                        </FormControl>
                                   </div>

                                </div>


                               


                                <div className="row">

                                    <div className="col-12" style={{marginTop:'20px', marginBottom:'20px'}}>
                                        <MaterialButton onClick={this.AccountLockHandle} style={{width:'100%'}} variant="contained" color="secondary">
                                           {
                                                !this.state.lockAccount ? 'Activate Account' : 'DISABLE THIS ACCOUNT'

                                           } 
                                        </MaterialButton>
                                    </div>

                                </div>

                                   

                                </div>
                            </Paper>
                               
                        </Drawer.Body>


                  

                    <Drawer.Footer style={{marginBottom:'10px'}}>
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
