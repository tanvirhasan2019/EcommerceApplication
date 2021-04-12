import React, { Component, Fragment } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import { Temp } from './components/HomeComponents/Temp';
import AuthorizeRoute from './components/api-authorization/AuthorizeRoute';
import ApiAuthorizationRoutes from './components/api-authorization/ApiAuthorizationRoutes';
import { ApplicationPaths } from './components/api-authorization/ApiAuthorizationConstants';
import { dashboard } from './components/adminPanel/dashboard';
import { updateSingleProduct } from './components/adminPanel/customize_product/updateSingleProduct';
import { CustomLayout } from './components/CustomLayout';
import CartItem from './components/HomeComponents/CartItem/CartItems';
import Checkout from '././components/CheckOut/Checkout';
import EditPost from './components/HomeComponents/Post/EditPost';
import BlogPage from './components/HomeComponents/Post/BlogSection';
import MyStatefulEditor from './components/HomeComponents/Post/MyStatefulEditor';
import Orderlist from './components/HomeComponents/user/Orderlist'
import './custom.css'

 export default class App extends Component {
  static displayName = App.name;

  render () {
      return (

          <Fragment>
             
              
              <Route path='/cart-item' component={CartItem} /> 
              <AuthorizeRoute path='/checkout' component={Checkout} /> 
              <AuthorizeRoute path='/blog-page' component={BlogPage} /> 
              <AuthorizeRoute path='/post-editor' component={MyStatefulEditor} />             
              <Route path={ApplicationPaths.ApiAuthorizationPrefix} component={ApiAuthorizationRoutes} />           
              <AuthorizeRoute strict exact path='/dashboard' component={dashboard} />
              <AuthorizeRoute strict exact path='/update-product/:id' component={updateSingleProduct} />
              <AuthorizeRoute strict exact path='/user-orders-item' component={Orderlist} />
              <Route exact path='/' component={Home} />
             

      </Fragment>
    );
  }
}


//export default connect(mapStateToProps, mapDispatchToProps)(App);

//<Route strict exact path='/update-product/:id' component={updateSingleProduct} />

