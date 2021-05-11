import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import "./dashboard.css";

import MenCategory from '../adminPanel/UploadProduct/Categories/MenCategory';
import StationaryCategory from '../adminPanel/UploadProduct/Categories/StationaryCategory';
import LadiesCategory from '../adminPanel/UploadProduct/Categories/LadiesCategory';
import KidsCategory from '../adminPanel/UploadProduct/Categories/KidsCategory';
import ElectronicsCategory from '../adminPanel/UploadProduct/Categories/ElectronicsCategory';
import ProductTable from './customize_product/ProductTable'
import PostTable from './Post/PostTable'
import UserTable from './UserList/UserTable'
import ChatTable from './chat/ChatTable'

import OrderItem from '../adminPanel/customize_product/OrderItem/OrderItem'

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
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
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
        display: 'flex',
       
    },
    tabs: {
        borderRight: `1px solid ${theme.palette.divider}`,
    },
}));

export default function VerticalTabs() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className={classes.root}>
            <Tabs
                orientation="vertical"
                variant="scrollable"
                value={value}
                onChange={handleChange}
                aria-label="Vertical tabs example"
                className={classes.tabs}
                style={{ fontSize:'2rem' }}
                >
                <Tab label="UPLOAD PRODUCT" {...a11yProps(0)} />
                <Tab label="UPDATE & DELETE" {...a11yProps(1)} />
                <Tab label="ORDER ITEM" {...a11yProps(2)} />
                <Tab label="POST" {...a11yProps(3)} />
                <Tab label="MESSAGE" {...a11yProps(4)} />
                <Tab label="ALL USERS" {...a11yProps(5)} />
                <Tab label="DELETE" {...a11yProps(6)} />
            </Tabs>
            <TabPanel value={value} index={0} style={{ width: '80vw' }}>

                <div className="form-wrap">
                     <MenCategory />
                </div>

                            

      </TabPanel>
            <TabPanel value={value} index={1} style={{ width: '80vw' }}>
               
                <div className="form-wrap">
                    <ProductTable />
                </div>
      </TabPanel>
            <TabPanel value={value} index={2}>
                <OrderItem />
      </TabPanel>
            <TabPanel value={value} index={3}>
                <PostTable />
      </TabPanel>
            <TabPanel value={value} index={4}>
                <ChatTable />
      </TabPanel>
            <TabPanel value={value} index={5}>
                <UserTable />
      </TabPanel>
            <TabPanel value={value} index={6}>
                Item Seven
      </TabPanel>
        </div>
    );
}
