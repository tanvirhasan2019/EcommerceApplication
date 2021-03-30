import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PhoneIcon from '@material-ui/icons/Phone';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import HelpIcon from '@material-ui/icons/Help';
import ShoppingBasket from '@material-ui/icons/ShoppingBasket';
import ThumbDown from '@material-ui/icons/ThumbDown';
import ThumbUp from '@material-ui/icons/ThumbUp';
import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import InputAdornment from '@material-ui/core/InputAdornment';
import AccountCircle from '@material-ui/icons/AccountCircle';

import FastfoodIcon from '@material-ui/icons/Fastfood';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';

import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import LocalMallIcon from '@material-ui/icons/LocalMall';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';

import Demo from '../../DateTimeComponent/Demo';
import OrderProductItem from '../EditProduct/OrderProductItem'
import ShippingDetail from '../EditProduct/ShippingDetail'


import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-prevent-tabpanel-${index}`}
      aria-labelledby={`scrollable-prevent-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-prevent-tab-${index}`,
    'aria-controls': `scrollable-prevent-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function ScrollableTabsButtonPrevent() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="off"
          aria-label="scrollable prevent tabs example"
        >

          <Tab icon={<AccountCircleIcon />} aria-label="phone" {...a11yProps(0)} />
          <Tab icon={<LocalMallIcon />} aria-label="favorite" {...a11yProps(1)} />
          <Tab icon={<LocalShippingIcon />} aria-label="person" {...a11yProps(2)} />
          
          
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
              <div className="container">
                  <div className="row">
                      <FormControl style={{ width: '100%', marginTop:'10px' }}>
                          <InputLabel htmlFor="input-with-icon-adornment">ORDER ID</InputLabel>
                          <Input
                              id="input-with-icon-adornment"
                              startAdornment={
                                  <InputAdornment position="start">
                                      <FastfoodIcon />
                                  </InputAdornment>
                              }
                          />
                      </FormControl>
                  </div>

                  <div className="row">

                      <FormControl style={{ width: '100%', marginTop: '20px' }}>
                          <InputLabel htmlFor="input-with-icon-adornment">USER ID</InputLabel>
                          <Input
                              id="input-with-icon-adornment"
                              startAdornment={
                                  <InputAdornment position="start">
                                      <AccountCircle />
                                  </InputAdornment>
                              }
                          />
                      </FormControl>
                      
                  </div>
                  <div className="row">
                      <FormControl style={{ width: '100%', marginTop: '20px' }}>
                          <InputLabel htmlFor="input-with-icon-adornment">TRANSACTION ID</InputLabel>
                          <Input
                              id="input-with-icon-adornment"
                              startAdornment={
                                  <InputAdornment position="start">
                                      <AccountBalanceWalletIcon />
                                  </InputAdornment>
                              }
                          />
                      </FormControl>
                  </div>
                  <div className="row">
                      <FormControl style={{ width: '100%', marginTop: '20px' }}>
                          <InputLabel htmlFor="input-with-icon-adornment">AMOUNT</InputLabel>
                          <Input
                              id="input-with-icon-adornment"
                              startAdornment={
                                  <InputAdornment position="start">
                                      <MonetizationOnIcon />
                                  </InputAdornment>
                              }
                          />
                      </FormControl>
                  </div>
                  <div className="row">

                      <FormControl style={{ width: '100%', marginTop: '20px' }}>

                          <InputLabel htmlFor="age-native-simple">PAYEMENT TYPE</InputLabel>
                          <Select
                              native
                              value="VISA"
                              onChange={handleChange}
                              inputProps={{
                                  name: 'age',
                                  id: 'age-native-simple',
                              }}
                          >
                              <option aria-label="None" value="" />
                              <option value="VISA">VISA</option>
                              <option value="MASTER">MASTER</option>
                              <option value="BKASH">BKASH</option>
                          </Select>
                      </FormControl>


                      <FormControl style={{ width: '100%', marginTop: '20px' }}>
                          <Demo value='1995-12-17T03:24:00' />
                      </FormControl>

                    


                  </div>
                  
                  
                 
              </div>

      </TabPanel>
      <TabPanel value={value} index={1}>
              <div className="container">
                  <OrderProductItem />
               </div>
      </TabPanel>
      <TabPanel value={value} index={2}>
              <div className="container">
                  < ShippingDetail />
              </div>
             
      </TabPanel>
     
      
    </div>
  );
}
