import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import AddressForm from './AddressForm';
import PaymentForm from './PaymentForm';
import Review from './Review';
import Layout from '../Layout';
import { useSelector } from 'react-redux';
import authService from '../api-authorization/AuthorizeService';
import { toaster } from 'evergreen-ui';



function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                Tanshen Technology
      </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    appBar: {
        position: 'relative',
    },
    layout: {
        width: 'auto',
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
            width: 600,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        padding: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
            marginTop: theme.spacing(6),
            marginBottom: theme.spacing(6),
            padding: theme.spacing(3),
        },
    },
    stepper: {
        padding: theme.spacing(3, 0, 5),
    },
    buttons: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
    button: {
        marginTop: theme.spacing(3),
        marginLeft: theme.spacing(1),
    },
}));

const steps = ['Shipping address', 'Payment details', 'Review your order'];

function getStepContent(step) {
    switch (step) {
        case 0:
            return <AddressForm />;
        case 1:
            return <PaymentForm />;
        case 2:
            return <Review />;
        default:
            throw new Error('Unknown step');
    }
}

export default function Checkout() {
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);

    const CartData = useSelector(state => state.cartUpdate.data);
    const Shipping_Data = useSelector(state => state.ShippingDetails.data);
    const Payement_Data = useSelector(state => state.CreditCardDetails.data);

    const handleNext = () => {
        setActiveStep(activeStep + 1);
        if (activeStep === steps.length - 1) {

            console.log('PLACE ORDER FINAL');
            post_to_server();
           
        }
    };

    async function post_to_server(){

        const token = await authService.getAccessToken();
        console.log("Token Data here : " + token);

        var productid = [];
        var quantity = [];
        var price = [];

        CartData.List.map(item => {
            productid.push(item.id);
            quantity.push(item.quantity);
            price.push(item.price);
        }

        )

        fetch('ClientOrder/PlaceOrder', {
            method: 'POST', // or 'PUT'
            headers: !token ? {} : {
                'Content-Type': 'application/json; charset=utf-8', 'Authorization': `Bearer ${token}`
            },

            body: JSON.stringify({

                'productid': productid,
                'quantity': quantity,
                'price': price,
                'payementType': 'VISA',

            }),
        })
            .then(response => response.json())
            .then(Response => {
                toaster.success(
                    '' + Response.status
                )
                console.log('Success:', Response);

            })
            .catch((error) => {

                console.error('Error:', error);
                toaster.danger(
                    'Something went wrong trying to create your audience'
                )
            });
    };

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

    return (
        <Layout>
        <div style={{ backgroundColor: '#fafafa'}}>
        <React.Fragment>
            <CssBaseline />
            <AppBar position="absolute" color="default" className={classes.appBar}>
                
            </AppBar>
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <Typography component="h1" variant="h4" align="center">
                        Checkout
          </Typography>
                    <Stepper activeStep={activeStep} className={classes.stepper}>
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    <React.Fragment>
                        {activeStep === steps.length ? (
                            <React.Fragment>
                                <Typography variant="h5" gutterBottom>
                                    Thank you for your order.
                </Typography>
                                <Typography variant="subtitle1">
                                    Your order number is #2001539. We have emailed your order confirmation, and will
                                    send you an update when your order has shipped.
                </Typography>
                            </React.Fragment>
                        ) : (
                                <React.Fragment>
                                    {getStepContent(activeStep)}
                                    <div className={classes.buttons}>
                                        {activeStep !== 0 && (
                                            <Button onClick={handleBack} className={classes.button}>
                                                Back
                    </Button>
                                        )}
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={handleNext}
                                            className={classes.button}
                                        >
                                            {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
                                        </Button>
                                    </div>
                                </React.Fragment>
                            )}
                    </React.Fragment>
                </Paper>
                <Copyright />
            </main>
            </React.Fragment>
            </div>
            </Layout>
    );
}