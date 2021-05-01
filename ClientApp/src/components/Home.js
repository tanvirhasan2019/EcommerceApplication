import React, { Component, Fragment } from 'react';

import ControlledCarousel from './HomeComponents/ControlledCarousel';
import Tabs from './HomeComponents/ScrollableTabsButtonForce';
import PaginationExampleCompact from './HomeComponents/PaginationExampleCompact';
import FooterLayout from './FooterLayout';
import Layout from './Layout';
import Slider from '../components/Slider';
import CartButton from './HomeComponents/CartItem/CartButton';
import './HomeComponents/Home.scss';
import ChatOnline from '../chat/ChatOnline';

import authService from '../components/api-authorization/AuthorizeService'

import { useSelector } from 'react-redux';

var paginationList = 0;

export class Home extends Component {
    state = {
        PRICE: {
            label: "PRICE",
            min: 0,
            max: 100000,
            step: 1,
            value: { min: 0, max: 100000 },
           
        },
        title: '',
        cartSize: 0, 
        activePage: 1,
        isLogin: false,
        isAuthenticated: false,
        userid: null,
        userName: null,
        
    }
    handleTitleChange = event => {
        this.setState({
            title: event.target.value
        }, () => console.log('SEARCH INPUT IS ' + this.state.title))
    }
    onChange = data => {
        this.setState({
            [data.type]: {
                ...this.state[data.type],
                value: data.value
            }
        }, () => console.log('PRODUCT LIST SIZE IS '+ data));
    };

    cart_size = data1 => {

        this.setState({ cartSize: Math.ceil(data1 / 10) },
            () => console.log('PER PAGE WILL DISPLAY ' + this.state.cartSize) )
        //paginationList = Math.ceil(data1 / 3)
       // console.log('PER PAGE WILL DISPLAY ' + this.state.cartSize);
    };

    handlePaginationChange = (e, { activePage }) => {
        this.setState({ activePage: activePage }, () => console.log("PAGE CLICKED " + JSON.stringify(this.state.activePage)))
        //setActivePage(activePage)
       
    }

    async componentDidMount() {

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
            userName: user && user.name,
            userid: user && user.sub
        });
      
        
    }
  

    render() {
       
        
        //localStorage.removeItem('cart');
        //var Total_product = 0;
        var data1 = 0
       
       

        return (
            <Layout>
             
              
              <div className="row carousel-div">
                    <div className="col-12">
                        <ControlledCarousel/>
                    </div>
               
              </div>


           
                <div className="row">
                    <div className="col-md-6 col-sm-12">
                        <div className="search-product d-flex justify-content-center align-items-center">
                            <div className="search">
                                <input type="text" value={this.state.title}
                                    onChange={this.handleTitleChange} className="searchTerm" placeholder="What are you looking for?" />
                                    <button type="submit" className="searchButton">
                                        <i className="fa fa-search"></i>
                                    </button>
                             </div>
                         </div>
                    </div>
                    <div className="col-md-6 com-sm-12">
                        <div className="range-input">
                            <Slider data={this.state.PRICE} onChange={this.onChange} />
                        </div>
                    </div>
                </div>

              <div className="row">
                    <div className="col-12 tab-content">
                        <Tabs pageNumber={this.state.activePage} cart_size={this.cart_size} filterPrice={this.state.PRICE.value} filterProduct={this.state.title} />
                  </div>
              </div>

                
                <CartButton />
                
              
                <div className="row">
                    <PaginationExampleCompact
                        onChange={this.state.cartSize}
                        handlePaginationChange={this.handlePaginationChange}
                        activePagehandle={this.state.activePage} />
              </div>

              <div className="row">
                  <FooterLayout />
                </div>

                <ChatOnline  login={this.state.isAuthenticated} id={this.state.userid} />
            </Layout>
        
    );
  }
}






