﻿import React, { Component } from 'react';
import authService from '../../api-authorization/AuthorizeService'
import { ApplicationPaths } from '../../api-authorization/ApiAuthorizationConstants';

import { Navbar, Nav} from 'react-bootstrap'
import { Link } from 'react-router-dom';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

export default class Orderlist extends Component {
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
        

        return (

            <Navbar style={{backgroundColor:'black'}} bg="dark" variant="dark">

                <div style={{width:'100%'}} className="d-flex justify-content-between">
                    <Link
                        style={{ color: 'white' }} to="/">
                        <ArrowBackIosIcon />  BACK 
                    </Link>
                    <Nav>
                        <Nav.Link >
                            hello {userName}
                        </Nav.Link>
                    </Nav>
                </div>
               
            </Navbar>

        );
    }
}
