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
import Ringloader from './../../components/spinner/Ringloader';

import ProductsList from './NewFolder/ProductsList';



import { connect } from 'react-redux';

//import { fetchProducts } from '../../actions/Products';



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



function ScrollableTabsButtonForce({ pageNumber, cart_size, allProducts, fetchProducts, filterPrice, filterProduct}) {

    const classes = useStyles();
    //const CartData = useSelector(state => state.products.data);
    var filteredProducts = []
    var paginationPrducts=[]

    const [value, setValue] = React.useState(0);
  
   

    if (allProducts.isLoading === false && allProducts.isLoading !== undefined) {

        console.log('All products data from database ', allProducts)
        if (filterProduct.length > 0 || filterPrice.min !== 0 || filterPrice.max !== 100000) {


            allProducts.data.map(item => {
                if (((item.title.toLowerCase().includes(filterProduct.toLowerCase()) ||
                    item.category.toLowerCase().includes(filterProduct.toLowerCase()) ||
                    item.subcategory.toLowerCase().includes(filterProduct.toLowerCase())) &&
                    (item.price >= filterPrice.min && item.price <= filterPrice.max))) {

                     filteredProducts.push(item);
                        
                }
            });
           
            cart_size(filteredProducts.length)
            

        } else {
            allProducts.data.map(item => {

                filteredProducts.push(item);
            });

            cart_size(filteredProducts.length)

        }
    }

    if (pageNumber > 1) {
        filteredProducts.slice((pageNumber * 10)-10, pageNumber * 10).map(item => {
            paginationPrducts.push(item)
        });

    } else {
        filteredProducts.slice(0, 11).map(item => {
            paginationPrducts.push(item)
        });
    }

    
    

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


   /* useEffect(() => {
        fetchProducts()
            .catch(error => {
                console.log("Loading authors failed: " + error);
            });
    }, []) */
   
 

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
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {
                            allProducts.isLoading ? (<Ringloader />) : (null)
                        }
                    </div>
                    
                     <div className="card-deck"> 
                        
                          
                         {
                            allProducts.isLoading === false && allProducts.isLoading !== undefined &&
                            
                            paginationPrducts.map(item => 
                                <ProductsList value={item} key={item.id} /> 
                               
                             ) 
                   
                         }
                 

                    </div>
                </div>

      </TabPanel>
            <TabPanel value={value} index={1}>

                <div className="container">
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {
                            allProducts.isLoading ? (<Ringloader key={1} />) : (null)
                        }
                    </div>
                     <div className="card-deck">
                         {
                             

                             allProducts.isLoading === false && allProducts.isLoading !== undefined &&
                            filteredProducts.map(item =>
                                item.category === 'GENTS' ? < ProductsList value={item} key={item.id} />:null
                             )

                         }
                    </div>
                </div>
                  
  
                
      </TabPanel>
            <TabPanel value={value} index={2}>
                <div className="container">
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {
                            allProducts.isLoading ? (<Ringloader key={1} />) : (null)
                        }
                    </div>
                    <div className="card-deck">

                         {
                             allProducts.isLoading === false && allProducts.isLoading !== undefined &&
                            filteredProducts.map(item =>
                                item.category === 'LADIES' ? <ProductsList value={item} key={item.id} /> : null
                             )

                         }

                    </div>
                </div>

                
                
      </TabPanel>
            <TabPanel value={value} index={3}>
                <div className="container">
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {
                            allProducts.isLoading ? (<Ringloader key={1} />) : (null)
                        }
                    </div>
                    <div className="card-deck">

                         {
                             allProducts.isLoading === false && allProducts.isLoading !== undefined &&
                            filteredProducts.map(item =>
                                item.category === 'KIDS' ? <ProductsList value={item} key={item.id} /> : null
                             )

                         }

                    </div>
                </div>
      </TabPanel>
            <TabPanel value={value} index={4}>
                <div className="container">
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {
                            allProducts.isLoading ? (<Ringloader key={1} />) : (null)
                        }
                    </div>
                    <div className="card-deck">

                         {
                             allProducts.isLoading === false && allProducts.isLoading !== undefined &&
                            filteredProducts.map(item =>
                                item.category === 'ELECTRONICS' ? <ProductsList value={item} key={item.id} /> : null
                             )

                         }
                    </div>
                </div>
      </TabPanel>
            <TabPanel value={value} index={5}>
                <div className="container">
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {
                            allProducts.isLoading ? (<Ringloader key={1} />) : (null)
                        }
                    </div>
                    <div className="card-deck">

                         {
                             allProducts.isLoading === false && allProducts.isLoading !== undefined &&
                            filteredProducts.map(item =>
                                item.category === 'STATIONARY' ? <ProductsList value={item} key={item.id} /> : null
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
   // fetchProducts
};



export default connect(mapStateToProps, mapDispatchToProps)(ScrollableTabsButtonForce);


