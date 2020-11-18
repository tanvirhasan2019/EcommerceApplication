import React, { Component } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import { LoginMenu } from './api-authorization/LoginMenu';

import ShopTwoIcon from '@material-ui/icons/ShopTwo';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import MessageIcon from '@material-ui/icons/Message';


import './NavMenu.css';
import { Searchitem } from './Searchitem';

 export class NavMenu extends Component {
  static displayName = NavMenu.name;

  constructor (props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true
    };
  }

  toggleNavbar () {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  render () {
      return (
          <header className="nav-header">
        <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3 light">
                <Container>
                    <NavbarBrand tag={Link} to="/"><ShopTwoIcon className="custom-icon" style={{ fontSize: '30px' }}/></NavbarBrand>
            <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
            <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>
              <ul className="navbar-nav flex-grow">
                <NavItem>
                    <NavLink>
                        <Searchitem/>
                    </NavLink>
                </NavItem>


                            <NavItem>
                                <NavLink tag={Link} to="/cart-item"> <ShoppingCartIcon  className="custom-icon" style={{ fontSize:'30px' }} /></NavLink>
                            </NavItem>
                            <NavItem>
                                  <NavLink tag={Link} to="/post-data">
                                        <NotificationsActiveIcon className="custom-icon" style={{ fontSize: '30px' }}/>
                                </NavLink>
                            </NavItem>

                            <NavItem>
                                <NavLink>
                                    <MessageIcon className="custom-icon" style={{ fontSize: '30px' }} />
                                </NavLink>
                            </NavItem>

                            <LoginMenu>
                            </LoginMenu>
               
              
              </ul>
            </Collapse>
          </Container>
        </Navbar>
      </header>
    );
  }
} 
