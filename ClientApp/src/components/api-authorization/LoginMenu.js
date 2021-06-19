import 'semantic-ui-css/semantic.min.css'
import React, { Component, Fragment } from 'react';
import { NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import authService from './AuthorizeService';
import { ApplicationPaths } from './ApiAuthorizationConstants';
import {Icon } from 'semantic-ui-react'
//import { Dropdown, DropdownButton } from 'react-bootstrap';
//import { Dropdown } from 'semantic-ui-react';
import { Redirect } from "react-router";
import { Menu, Dropdown, Button, message, Space, Tooltip } from 'antd';
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import Typography from '@material-ui/core/Typography';
import GetAppIcon from '@material-ui/icons/GetApp';
import ArrowDropDownCircleIcon from '@material-ui/icons/ArrowDropDownCircle';


 export class LoginMenu extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isAuthenticated: false,
            userName: null,
            redirect: false,
            data : null
        };
    }


   
     componentDidMount() {

        this._subscription = authService.subscribe(() => this.populateState());
        this.populateState();

    }

    componentWillUnmount() {
        authService.unsubscribe(this._subscription);
    }

    async populateState() {
        const [isAuthenticated, user] = await Promise.all([authService.isAuthenticated(), authService.getUser()])
        this.setState({
            isAuthenticated,
            userName: user && user.name
        });
     }


    render() {
        const { isAuthenticated, userName } = this.state;

       
        if (!isAuthenticated) {

            const registerPath = `${ApplicationPaths.Register}`;
            const loginPath = `${ApplicationPaths.Login}`;
            return this.anonymousView(registerPath, loginPath);

        } else {
            const profilePath = `${ApplicationPaths.Profile}`;
            const logoutPath = { pathname: `${ApplicationPaths.LogOut}`, state: { local: true } };
            return this.authenticatedView(userName, profilePath, logoutPath);
        }
     }

    
    
     authenticatedView(userName, profilePath, logoutPath) {


         var userSign = "Signed in as " + this.state.userName
        

         const redirectHandler = (event, data) => {
             console.log('Riderect handler is called', data)
             if (data.value != 0) {
                 console.log('selected option is not 0')
                 this.setState({ redirect: true })
                 this.setState({ path: data.value })                
                 renderRedirect();
             }

         }

         const renderRedirect = () => {

             if (this.state.redirect) {
                 console.log('selected option render path ', this.state.path)
                 return <Redirect to={this.state.path} />
                 this.setState({ redirect: false })
                 this.setState({ path: '' })
             }

         }
         const menu = (
                 <Menu>                            
                 <Menu.Item to={profilePath}  key="1">
                       <Link style={{width:'100%'}} to={profilePath}> My Profile </Link>
                 </Menu.Item>  

                 <Menu.Item to={profilePath} key="2">
                     <Link style={{ width: '100%' }} to="/user-orders-item"> My Orders </Link>
                 </Menu.Item>  

                 <Menu.Item to={profilePath} key="3">
                     <Link style={{ width: '100%' }} to={logoutPath}> Logout </Link>
                 </Menu.Item>  

                  </Menu>
         );

         return (<Fragment>
             <NavItem style={{ height: '100%', textAlign: 'center' }}>
                
                 <NavLink>
                     <Dropdown overlay={menu}>
                         <Button>                             
                             <Typography style={{ textAlign: 'center', color: 'blue' }} variant="subtitle2" gutterBottom>
                                 {userSign} &nbsp; <ArrowDropDownCircleIcon />
                             </Typography>
                         </Button>
                     </Dropdown>

                 </NavLink>


             </NavItem>

         </Fragment>);


   
     }

   
    anonymousView(registerPath, loginPath) {
        return (<Fragment>
            <NavItem>
                <NavLink tag={Link} className="text-dark" to={registerPath}>Register</NavLink>
            </NavItem>
            <NavItem>
                <NavLink tag={Link} className="text-dark" to={loginPath}>Login</NavLink>
            </NavItem>
        </Fragment>);
    }
}



