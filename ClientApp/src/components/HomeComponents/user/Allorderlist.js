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
   

    console.log('props data all order list', props.data)
    var url = "https://lh3.googleusercontent.com/proxy/JuO4lILGhUS6icJx2zJIehu2NtA4uXiR5_eKJZkgxvO41jSKjzpvhuQslHxMFX1Ql6zSY-CSp5TlnxgUP4lyTzYUBoQ3vtgbCNCB691r2NGVfj-rNbbelgh6Cr__bTL2MOXmIeZ6E_QPsq6Df4ZZsfBOkA"
   
    return (
        <>
            <div className="d-flex justify-content-center align-items-center" style={{
                color:'white',
                width: '100%', height: '50px',
                backgroundColor: 'black',
                 }}>
                <p> Aligned flex item </p>
           </div>
           

                
                <div className="d-flex row justify-content-between">
                {
                    props.data.map((item, index) =>

                        <div className="col-xm-12 col-sm-6 col-md-6 col-lg-6"
                            style={{marginTop:'10px'}}
                        >
                            <CardViewOrder key={item.orderid} value={item.order} />
                      </div>

                
               )
                }
            </div>

        </>
    );
}
