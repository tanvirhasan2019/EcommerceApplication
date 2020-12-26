//import React{ useEffect } from 'react';
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import ShoppingBasket from '@material-ui/icons/ShoppingBasket';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import LocalMallIcon from '@material-ui/icons/LocalMall';
import ChildCareIcon from '@material-ui/icons/ChildCare';
import ImportantDevicesIcon from '@material-ui/icons/ImportantDevices';
import StoreIcon from '@material-ui/icons/Store';

import ProductsList from './NewFolder/ProductsList';



import { connect } from 'react-redux';

import { fetchProducts } from '../../actions/Products';
import { cartUpdate } from '../../actions/cartItem';



import Box from '@material-ui/core/Box';






function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            
            role="tabpanel"
            hidden={value !== index}
            id={`scrollable-force-tabpanel-${index}`}
            aria-labelledby={`scrollable-force-tab-${index}`}
            {...other}
            style={{ backgroundColor: '#F4F4F4' }}
        >
            {value === index && (
                <Box p={3}>
                    <div>{children}</div>
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
        id: `scrollable-force-tab-${index}`,
        'aria-controls': `scrollable-force-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
}));

function ScrollableTabsButtonForce({ allProducts, fetchProducts, cartUpdate}) {
    const classes = useStyles();
  
    const [value, setValue] = React.useState(0);
   

   // const { AllPrducts } = this.props;

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(() => {
        fetchProducts()
            .catch(error => {
                console.log("Loading authors failed: " + error);
            });
    }, [])
   
   /* function SwitchCase(props) {
        switch (props.value.category) {
            case 'GENTS':
                return <GentsItem key={props.value.id} value={props.value} />;
            case 'KIDS':
                return <KidsItem key={props.value.id} value={props.value}/>;
            case 'ELECTRONICS':
                return <ElectronicItem key={props.value.id} value={props.value}/>;
            case 'LADIES':
                return <LadiesItem key={props.value.id} value={props.value}/>;
            case 'STATIONARY':
                return <StationaryItem key={props.value.id} value={props.value}/>;
            
            default:
                return null;
        }
    } */

    
    
    return (
       
        <div className={classes.root}>

          

            <AppBar position="static" color="default">
                <Tabs
                    value={value}
                    onChange={handleChange}
                    variant="scrollable"
                    scrollButtons="on"
                    indicatorColor="primary"
                    textColor="primary"
                    aria-label="scrollable force tabs example"
                    
            >
                    <Tab label="ALL ITEMS" icon={<ShoppingBasket />} {...a11yProps(0)} />
                    <Tab label="GENTS" icon={<SupervisedUserCircleIcon />} {...a11yProps(1)} />
                    <Tab label="LADIES" icon={<LocalMallIcon />} {...a11yProps(2)} />
                    <Tab label="KIDS" icon={<ChildCareIcon />} {...a11yProps(3)} />
                    <Tab label="ELECTRONICS" icon={<ImportantDevicesIcon />} {...a11yProps(4)} />
                    <Tab label="STATIONARY" icon={<StoreIcon />} {...a11yProps(5)} />
                    
                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>

                <div className="container">
                     <div className="card-deck"> 
                         {
                             allProducts.isLoading
                         }
                          
                         {
                             allProducts.isLoading === false && allProducts.isLoading !== undefined &&
                            
                             allProducts.data.map(item => 
                                 <ProductsList value={item} /> 
                               
                             ) 
                   
                         }
                 

                    </div>
                </div>

      </TabPanel>
            <TabPanel value={value} index={1}>

                <div className="container">
                     <div className="card-deck">
                         {
                             

                             allProducts.isLoading === false && allProducts.isLoading !== undefined &&
                             allProducts.data.map(item =>
                                 item.category === 'GENTS' ? < ProductsList value = { item } />:null
                             )

                         }
                    </div>
                </div>
                  
  
                
      </TabPanel>
            <TabPanel value={value} index={2}>
                <div className="container">
                    <div className="card-deck">

                         {
                             allProducts.isLoading === false && allProducts.isLoading !== undefined &&
                             allProducts.data.map(item =>
                                 item.category === 'LADIES' ? <ProductsList value={item} /> : null
                             )

                         }

                    </div>
                </div>

                
                
      </TabPanel>
            <TabPanel value={value} index={3}>
                <div className="container">
                    <div className="card-deck">

                         {
                             allProducts.isLoading === false && allProducts.isLoading !== undefined &&
                             allProducts.data.map(item =>
                                 item.category === 'KIDS' ? <ProductsList value={item} /> : null
                             )

                         }

                    </div>
                </div>
      </TabPanel>
            <TabPanel value={value} index={4}>
                <div className="container">
                    <div className="card-deck">

                         {
                             allProducts.isLoading === false && allProducts.isLoading !== undefined &&
                             allProducts.data.map(item =>
                                 item.category === 'ELECTRONICS' ? <ProductsList value={item} /> : null
                             )

                         }
                    </div>
                </div>
      </TabPanel>
            <TabPanel value={value} index={5}>
                <div className="container">
                    <div className="card-deck">

                         {
                             allProducts.isLoading === false && allProducts.isLoading !== undefined &&
                             allProducts.data.map(item =>
                                 item.category === 'STATIONARY' ? <ProductsList value={item} /> : null
                             )

                         }

                      
                    </div>
                </div>
      </TabPanel>
            
        </div>
    );
}


const mapStateToProps = (state) => ({
  
    allProducts: state.products

});



const mapDispatchToProps = {
    fetchProducts
  

};



export default connect(mapStateToProps, mapDispatchToProps)(ScrollableTabsButtonForce);


