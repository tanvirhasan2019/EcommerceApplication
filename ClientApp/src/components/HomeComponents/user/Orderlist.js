import React, { useState, useEffect } from 'react';
import { NavMenu } from '../../NavMenu';
import SideMenu from './SideMenu'
import authService from '../../api-authorization/AuthorizeService'
import Allorderlist from './Allorderlist'

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
            <NavMenu />

      <Grid container spacing={3} style={{marginTop:'60px'}}>
        
           <Grid item xs={12} sm={2} md={2} lg={4} xl={4}>
                <Paper>
                     <SideMenu />
                </Paper>
            </Grid>
          <Grid item xs={12} sm={10} md={10} lg={8} xl={8}>
               <Paper className={classes.paper}>
                        {
                            !loading ? <Allorderlist data={data.data} /> : null
                        } 
                </Paper>
            </Grid>
       
      </Grid>
    </div>




    );
}

