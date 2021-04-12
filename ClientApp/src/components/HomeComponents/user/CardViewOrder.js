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
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FullScreenDrawer from './FullScreenDrawer'
import  deliver  from '../../../images/delivery.jpg'
import AddressForm from './AddressForm'
import NavigationIcon from '@material-ui/icons/Navigation';
import Fab from '@material-ui/core/Fab';

import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import CreditCardIcon from '@material-ui/icons/CreditCard';

import MaterialUIPickers from '../../adminPanel/customize_product/DateTimeComponent/Demo'
import Button from '@material-ui/core/Button';



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



export default function CardViewOrder(props) {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
    console.log('STATUS  ', props.status)

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

  

    return (
       
        <>
            <Card>
                            <CardHeader
                    avatar={
                        <Avatar aria-label="recipe" className={classes.avatar}>
                            P
                                </Avatar>
                    }
                    action={
                        <IconButton aria-label="settings">
                            <FullScreenDrawer value={props.value} />
                        </IconButton>
                    }
                    title={"ORDER ID " + props.orderid}
                    subheader={<MaterialUIPickers value={props.time}/>}
                            />
                            <CardMedia
                                className={classes.media}
                                image={deliver}
                                title=""
                            />
                            <CardContent>

                            <div className="d-flex justify-content-around">

                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        className={classes.button}
                                        startIcon={<MonetizationOnIcon  />}
                                    >
                                      {props.status}
                                   </Button>

                                    <Button
                                        variant="contained"
                                        color="primary"
                                        className={classes.button}
                                        startIcon={<MonetizationOnIcon />}
                                    >
                                       {props.price}
                                    </Button>

                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        className={classes.button}
                                        startIcon={<CreditCardIcon />}
                                    >
                                        {props.paymentMethod}
                                    </Button>
                                    
                                </div>
                            
                            </CardContent>
                            <CardActions disableSpacing>
                                
                                <IconButton aria-label="share">
                                    <ShareIcon />
                                </IconButton>
                                <IconButton
                                    className={clsx(classes.expand, {
                                        [classes.expandOpen]: expanded,
                                    })}
                                    onClick={handleExpandClick}
                                    aria-expanded={expanded}
                                    aria-label="show more"
                                >
                                    <ExpandMoreIcon />
                                </IconButton>
                            </CardActions>
                            <Collapse in={expanded} timeout="auto" unmountOnExit>
                                <CardContent>
                                    <AddressForm
                                        key={props.shipping.shippingid}
                                        shipping={props.shipping}
                                     />
                                </CardContent>
                            </Collapse>
                        </Card>                  

        </>
    );
}
