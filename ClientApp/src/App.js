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
import { CustomLayout } from './components/CustomLayout';
import CartItem from './components/HomeComponents/CartItem/CartItems';
import Checkout from '././components/CheckOut/Checkout';
import EditPost from './components/HomeComponents/Post/EditPost';
import BlogPage from './components/HomeComponents/Post/BlogSection';
import MyStatefulEditor from './components/HomeComponents/Post/MyStatefulEditor';
import './custom.css'

export default class App extends Component {
  static displayName = App.name;

  render () {
      return (

          <Fragment>


             
              <Route exact path='/' component={Home} />
              <Route path='/cart-item' component={CartItem} /> 
              <Route path='/checkout' component={Checkout} /> 
              <Route path='/blog-page' component={BlogPage} /> 
              <Route path='/post-editor' component={MyStatefulEditor} /> 
              <Route path='/fetch-data' component={FetchData} />
              <Route path={ApplicationPaths.ApiAuthorizationPrefix} component={ApiAuthorizationRoutes} />
            
              <Route strict exact path='/temp' component={Temp} />
              <Route strict exact path='/dashboard' component={dashboard} />
             

      </Fragment>
    );
  }
}
