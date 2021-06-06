import React, { Component, Fragment } from 'react';
import './dashboard.css';
import VerticalTabs from '../adminPanel/VerticalTabs';
//import authService from './AuthorizeService'
import authService from '../api-authorization/AuthorizeService'
import CustomLayout from '../../components/CustomLayout';
import Alert from '@material-ui/lab/Alert';

export class dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = { select:'NewProduct', role: false,
            loading : true };
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
        const role = data.statusCode == 200 ? true : false ;
        this.setState({loading: false , role});
       //this.setState({loading: false });
    }
    

    render() {
        return (
            <>
                {
                    this.state.loading ? null : null
                }

                {
                    !this.state.loading && this.state.role ? <CustomLayout>
                        <VerticalTabs />
                    </CustomLayout> :
                        <Alert variant="filled" severity="warning">
                            Authorization required!
                       </Alert>
                }
                
           </>
        );
    }
}
