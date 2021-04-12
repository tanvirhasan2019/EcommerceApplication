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

var url = "https://lh3.googleusercontent.com/proxy/JuO4lILGhUS6icJx2zJIehu2NtA4uXiR5_eKJZkgxvO41jSKjzpvhuQslHxMFX1Ql6zSY-CSp5TlnxgUP4lyTzYUBoQ3vtgbCNCB691r2NGVfj-rNbbelgh6Cr__bTL2MOXmIeZ6E_QPsq6Df4ZZsfBOkA"


export default function CardViewOrder(props) {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
    console.log('card view order ', props.value)

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
                    title={props.time}
                    subheader=""
                            />
                            <CardMedia
                                className={classes.media}
                                image={deliver}
                                title="Paella dish"
                            />
                            <CardContent>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    This impressive paella is a perfect party dish and a fun meal to cook together with your
                                    guests. Add 1 cup of frozen peas along with the mussels, if you like.
                                </Typography>
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
