import React from 'react'
import { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { ApplicationPaths, QueryParameterNames } from './ApiAuthorizationConstants'
import authService from './AuthorizeService'

export default class ApiRoleAuthorization extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ready: false,
            role: false,
            loading : true
        };
    }

    componentDidMount() {
        this.CheckRoleData()
    }
    async CheckRoleData() {
        const token = await authService.getAccessToken();
        console.log('Check role token ', token)
        const response = await fetch('Admin/RoleCheck', {
            headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
        });
        const data = await response.json();
        console.log('Custom role check ', {data})
        this.setState({loading: false });
    }
    

    render() {
        const { ready, authenticated, loading , role } = this.state;
        const redirectUrl = `${ApplicationPaths.Login}?${QueryParameterNames.ReturnUrl}=${encodeURI(window.location.href)}`
        if (loading) {
            return <div></div>;
        } else {
            const { component: Component, ...rest } = this.props;
            return <Route {...rest}
                render={(props) => {
                    if (role) {
                        return <Component {...props} />
                    } else {
                        return <Redirect to={redirectUrl} />
                    }
                }} />
        }
    }

   
}
