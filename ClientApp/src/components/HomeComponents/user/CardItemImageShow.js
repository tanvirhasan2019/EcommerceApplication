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

import GalleriaAutoPlayDemo from './GalleriaAutoPlayDemo'
//CardItemImageShow

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

export default function CardItemImageShow(props) {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);


    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    console.log('props data from image card', props.value)
    console.log('props IMAGE DATA from image card', props.image)

    var url = "http://www.wellesleysocietyofartists.org/wp-content/uploads/2015/11/image-not-found.jpg"
   
    return (
        <>

                        <Card style={{ width: '100%', margin: '10px' }}>
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
                               title={props.image.title}
                                subheader="20201"
                            />
                            <div className="row">
                                <div className="col-md-6">
                        <GalleriaAutoPlayDemo value={props.image.img} />
                                </div>
                                <div className="col-md-6">
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

                                                            </InputAdornment>
                                                        }
                                                    />
                                                </FormControl>
                                            </div>
                                        </div>
                                    </CardContent>
                                </div>
                            </div>



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

                                    <div className="row" style={{ padding: '10px' }}>
                                        <Typography paragraph>
                                {props.image.description}
                                </Typography>
                                    </div>




                                </CardContent>
                            </Collapse>
                        </Card>
                
        </>
    );
}
