import React, { useState, useEffect } from 'react';
import {useRef } from "react";
import { NavMenu } from '../../NavMenu';
import SideMenu from './SideMenu'
import authService from '../../api-authorization/AuthorizeService'
import Allorderlist from './Allorderlist'
import ScaleSpinner  from '../../spinner/ScaleSpinner'
//import NavbarUser from './NavbarUser'

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Layout from '../../Layout'




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
    const isMounted = useRef(false);


    const classes = useStyles();
    const spinner =
        <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)'}}>
            
                <ScaleSpinner />
            
        </div>


    const [result, setResult] = React.useState([]);
    //const [loading, setLoading] = React.useState("false");

    React.useEffect(() => {


        async function fetchorderList() {
            try {

                const token = await authService.getAccessToken()
                const response = await fetch('ClientOrder/Getuserorder', {
                    headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
                });
                const data = await response.json();
                setData(data)
                setLoading(false)
                //setResult(data.data)

                console.log('after fetch ', { data })

            }catch (e) {
                console.log('ERROR CALLED')
            }
            
              
        }


        if (!data.data) {
            fetchorderList();
        }
       
}, []); 




   /* useEffect(async () => {

       

         //return () => { isMounted = false }; 

        isMounted.current = true;


        const token = await authService.getAccessToken()
        // console.log('token', token)
        let isMounted = true;
        if (token) {

           // const token = await authService.getAccessToken()
            const response = await fetch('ClientOrder/Getuserorder', {
                headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
            });
            const data = await response.json();
            setData(data)
            setLoading(false)

            console.log('after fetch ', { data })

        }

        return () => isMounted.current = false;



    }, []); */


    let isRendered = useRef(false);

    /* useEffect(async() => {
        isRendered = true;
        const token = await authService.getAccessToken()
        // console.log('token', token)
        let isMounted = true;
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
        return () => {
            isRendered = false;
        };
    }, []);*/


   /*  useEffect(async () => {
        const token = await authService.getAccessToken()
       // console.log('token', token)
         let isMounted = true; 
        if (token) {
                      
            const response = await fetch('ClientOrder/Getuserorder', {
                headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
            });
            const data = await response.json();
            setData(data)
            setLoading(false)
            
            console.log('after fetch ', { data })

         }

       

    }, []); */

   
    return (

        <div>

           
            <NavMenu />
            <Grid container spacing={3} style={{ marginTop: '60px' }}>
        
                <div className="container">
                    <Paper className={classes.paper}>
                        {
                            !loading ? <Allorderlist data={data.data} /> : spinner
                        }
                    </Paper>

                </div>
            
       
            </Grid>

        </div>




    );
}



