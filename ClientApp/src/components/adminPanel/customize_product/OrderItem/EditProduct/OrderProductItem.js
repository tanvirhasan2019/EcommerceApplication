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
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import DeleteIcon from '@material-ui/icons/Delete';
import DialpadIcon from '@material-ui/icons/Dialpad';
import CategoryIcon from '@material-ui/icons/Category';
import LocalMallIcon from '@material-ui/icons/LocalMall';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import Input from '@material-ui/core/Input';


import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import InputAdornment from '@material-ui/core/InputAdornment';

import { useSelector } from 'react-redux';


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

export default function OrderProductItem(props) {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
   
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    var  ImageData=[]
    const data = useSelector(state => state.products.data)
    if (data) {
         ImageData = data.map(item => {
              return item
            })

    }
   
    if (ImageData) {
        console.log('Imaga data 53 ', ImageData)
    }
   /* if (data.isLoading == false ) {

        const ImageData = data.products.data.map(item => {
                item.img.map(item2 => {
                    if (item2.productid == 53) {
                        return item.img;
                    }
                })

            })
    }
   

    if (data.isLoading) {
        console.log('PRODUCT IMAGE DATA', { ImageData })
    } */
    
    
   

    return (
        <>
         {

                props.value.map(item =>

                    <Card style={{ width: '100%', marginTop:'10px' }}>
                        <CardHeader
                            avatar={
                                <Avatar aria-label="recipe" className={classes.avatar}>
                                    P
                                </Avatar>
                            }
                            action={
                                <IconButton aria-label="settings">
                                    <DeleteIcon style={{ color: 'red' }} />
                                </IconButton>
                            }
                            title={item.product.title}
                            subheader={item.dateTime}
                        />
                        <CardMedia
                            className={classes.media}
                            image="https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&resize=700%2C636"
                            title="Paella dish"
                        />
                        <CardContent>
                            <div className="container">
                                <div className="row">
                                    <FormControl style={{ width: '100%', marginTop: '20px' }}>
                                        <InputLabel htmlFor="input-with-icon-adornment">QUANTITY</InputLabel>
                                        <Input
                                            id="input-with-icon-adornment"
                                            startAdornment={
                                                <InputAdornment position="start">
                                                    <DialpadIcon />
                                                    {item.quantity}
                                                </InputAdornment>
                                            }
                                        />
                                    </FormControl>
                                </div>
                                <div className="row">
                                    <FormControl style={{ width: '100%', marginTop: '20px' }}>
                                        <InputLabel htmlFor="input-with-icon-adornment">PRICE</InputLabel>
                                        <Input
                                            id="input-with-icon-adornment"
                                            startAdornment={
                                                <InputAdornment position="start">
                                                    <MonetizationOnIcon />
                                                    {item.price}
                                                </InputAdornment>
                                            }
                                        />
                                    </FormControl>
                                </div>
                                <div className="row">
                                    <FormControl style={{ width: '100%', marginTop: '20px' }}>
                                        <InputLabel htmlFor="input-with-icon-adornment">CATEGORY</InputLabel>
                                        <Input
                                            id="input-with-icon-adornment"
                                            startAdornment={
                                                <InputAdornment position="start">
                                                    <CategoryIcon />
                                                    {item.product.category}
                                                </InputAdornment>
                                            }
                                        />
                                    </FormControl>
                                </div>
                                <div className="row">
                                    <FormControl style={{ width: '100%', marginTop: '20px' }}>
                                        <InputLabel htmlFor="input-with-icon-adornment">SUB CATEGORY</InputLabel>
                                        <Input
                                            id="input-with-icon-adornment"
                                            startAdornment={
                                                <InputAdornment position="start">
                                                    <LocalMallIcon />
                                                    {item.product.subcategory}
                                                </InputAdornment>
                                            }
                                        />
                                    </FormControl>
                                </div>
                            </div>
                        </CardContent>
                        <CardActions disableSpacing>
                            <IconButton aria-label="add to favorites">
                                <FavoriteIcon />
                            </IconButton>
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

                                <div className="row d-flex justify-content-between">
                                </div>
                                <div className="row">
                                    <Typography paragraph>
                                        {item.product.description}
                                    </Typography>
                                </div>

                               
                               
                                
                            </CardContent>
                        </Collapse>
                    </Card>

                )


        }
        
        </>
    );
}
