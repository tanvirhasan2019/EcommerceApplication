import React, { Component, Fragment } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import { Temp } from './components/HomeComponents/Temp';
import AuthorizeRoute from './components/api-authorization/AuthorizeRoute';
import ApiAuthorizationRoutes from './components/api-authorization/ApiAuthorizationRoutes';
//import ApiRoleAuthorization from './components/api-authorization/ApiRoleAuthorization';
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
//ApiRoleAuthorization
import './custom.css'

 export default class App extends Component {
  static displayName = App.name;

  render () {
      return (

          <Fragment>
             
              <Route exact path='/' component={Home} />
              <Route strict exact path='/cart-item' component={CartItem} /> 
              <AuthorizeRoute strict exact path='/checkout' component={Checkout} /> 
              <AuthorizeRoute strict exact path='/blog-page' component={BlogPage} /> 
              <AuthorizeRoute strict exact path='/post-editor' component={MyStatefulEditor} />             
                     
              <AuthorizeRoute strict exact path='/dashboard' component={dashboard} />
              <AuthorizeRoute strict exact path='/update-product/:id' component={updateSingleProduct} />
              <AuthorizeRoute strict exact path='/user-orders-item' component={Orderlist} />
              <Route path={ApplicationPaths.ApiAuthorizationPrefix} component={ApiAuthorizationRoutes} />  
             
             

      </Fragment>
    );
  }
}


//export default connect(mapStateToProps, mapDispatchToProps)(App);

//<Route strict exact path='/update-product/:id' component={updateSingleProduct} />

