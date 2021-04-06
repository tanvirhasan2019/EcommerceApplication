import 'semantic-ui-css/semantic.min.css'
import React, { Component, Fragment } from 'react';
import { NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import authService from './AuthorizeService';
import { ApplicationPaths } from './ApiAuthorizationConstants';

import { Dropdown, Icon } from 'semantic-ui-react'




 export class LoginMenu extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isAuthenticated: false,
            userName: null
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
         const trigger = (
             <span>
                 <Icon name='user' /> {this.state.userName}
             </span>
         )

         const options = [
             {
                 key: 'user',
                 text: (
                     <span>
                         Signed in as <strong>{this.state.userName}</strong>
                     </span>
                 ),
                 disabled: true,
             },
             {
               key: 'profile', text: <Link  to={profilePath}>Your Profile </Link>},
             { key: 'orders',  text: <Link  to =""> Your order list </Link > },
             { key: 'activity', text: <Link to=""> Your Activity </Link > },
             { key: 'sign-out', text: <Link  to = { logoutPath } > Sign Out </Link > } ,
         ]

         return (<Fragment>
             <NavItem style={{height:'100%', textAlign:'center'}}>
                 <NavLink>
                     <Dropdown  className="text-dark" trigger={trigger} options={options} />
                 </NavLink>

                 
             </NavItem>
            
         </Fragment>);

     }

   /* authenticatedView(userName, profilePath, logoutPath) {
        return (<Fragment>
            <NavItem>
                <NavLink tag={Link} className="text-dark" to={profilePath}>Hello {userName}</NavLink>
            </NavItem>
            <NavItem>
                <NavLink tag={Link} className="text-dark" to={logoutPath}>Logout</NavLink>
            </NavItem>
        </Fragment>);

    } */

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

