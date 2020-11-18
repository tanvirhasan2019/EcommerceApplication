import React, { Component, Fragment } from 'react';
import { Navbar, Nav, FormControl, Button, Form } from 'react-bootstrap';
import { LoginMenu } from '../api-authorization/LoginMenu';

export default class CustomNav extends Component {

    constructor(props) {
        super(props);
        this.state = { select:'NewProduct' };
    }

    render() {
        return (

            <Navbar bg="light" variant="light" className="d-flex justify-content-between">
                <div className="container">

                  <Navbar.Brand href="/">e shop</Navbar.Brand>
                  <Nav>
                    <LoginMenu/>
                   </Nav>
                </div>
            </Navbar>
        );
    }
}
