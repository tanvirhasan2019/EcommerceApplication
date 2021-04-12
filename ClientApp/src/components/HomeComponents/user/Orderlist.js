import React, { useState, useEffect } from 'react';
import { NavMenu } from '../../NavMenu';
import SideMenu from './SideMenu'
import authService from '../../api-authorization/AuthorizeService'
import Allorderlist from './Allorderlist'
import ScaleSpinner  from '../../spinner/ScaleSpinner'
import NavbarUser from './NavbarUser'

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';



const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));


export default function Orderlist() {

    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const classes = useStyles();
    const spinner =
        <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)'}}>
            
                <ScaleSpinner />
            
        </div>


     useEffect(async () => {
        const token = await authService.getAccessToken()
       // console.log('token', token)
        if (token) {

            const token = await authService.getAccessToken()
            const response = await fetch('ClientOrder/Getuserorder', {
                headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
            });
            const data = await response.json();
            setData(data)
            setLoading(false)
            
            console.log('after fetch ', { data })
        }
    }, []);

   
    return (

        <div>

            <NavbarUser />
             
          <Grid container spacing={3}>
        
        
             <Paper className={classes.paper}>
                 {
                            !loading ? <Allorderlist data={data.data} /> : spinner
                 } 
             </Paper>
          
       
            </Grid>

        </div>




    );
}

