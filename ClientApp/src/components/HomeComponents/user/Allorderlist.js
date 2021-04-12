import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';

import CardViewOrder from './CardViewOrder'



const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
}));

export default function Allorderlist(props) {
    const classes = useStyles();
   

    console.log('All Order List', props.data)
   
    return (
        <>
            <div className="d-flex justify-content-center align-items-center" style={{
                color:'white',
                width: '100%', height: '50px',
                backgroundColor: 'black',
                 }}>
                <p> YOUR ORDER LIST </p>
           </div>
           

                
                <div className="d-flex row justify-content-between">
                {
                    props.data.map((item, index) =>

                        <div className="col-xm-12 col-xxl-3 col-md-4"
                            style={{marginTop:'10px'}}
                        >
                            <CardViewOrder
                                key={item.orderid}
                                value={item.order}
                                shipping={item.shipping}
                                time={item.dateTime}
                                status={item.status}
                                orderid={item.orderid}
                                price={item.transaction.amount}
                                paymentMethod={item.transaction.payementType}
                               


                            />
                      </div>

                
               )
                }
            </div>

        </>
    );
}
