import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import {Link} from 'react-router-dom'
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function ButtonAppBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
          
             <Toolbar>
                <Box display='flex' flexGrow={1}>
                             
                     <Link to="/"  color="inherit" aria-label="menu" > 
                         <Typography  variant="h6" style={{color:'white'}} >
                            <ArrowBackIosIcon /> &nbsp; Back 
                         </Typography>
                     </Link>
                </Box>
           
                
                <Button color="inherit">@Tanshen Technology</Button>

             </Toolbar>
         
         
         

        
      </AppBar>
    </div>
  );
}


/*
<IconButton as={Link} to="/" edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <ArrowBackIosIcon /> 
          </IconButton>
         
        
          <Typography as={Link} to="/" variant="h6" style={{color:'white'}} className={classes.title}>
            Back 
          </Typography>
         
          <Button color="inherit">@Tanshen Technology</Button>
*/