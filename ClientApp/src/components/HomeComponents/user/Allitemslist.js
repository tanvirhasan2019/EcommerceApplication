import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { red } from '@material-ui/core/colors';

import CardItemImageShow from './CardItemImageShow'

import { useSelector } from 'react-redux';
import ScaleSpinner from '../../spinner/ScaleSpinner'

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

export default function Allitemslist(props) {
   
   
  
    console.log('props data all items list', props.value)

    var url = "http://www.wellesleysocietyofartists.org/wp-content/uploads/2015/11/image-not-found.jpg"
    var ImageData = []

    var data = useSelector(state => state.products)

     if (data.isLoading == false) {
  
          console.log('data', { data })
  
          ImageData = data.data.filter(o1 => props.value.some(o2 => o1.id === o2.product.id))
          //ImageData = data.data.filter(o1 => props.value.some(o2 => o1.id === o2.product.id))
          console.log('image data', { ImageData })
      }
     


    return (
        <>

            <div className="d-flex justify-content-center align-items-center" style={{
                color: 'white',
                width: '100%', height: '50px',
                backgroundColor: 'black',
            }}>
                <p> Aligned flex item </p>
            </div>


            {
                data.isLoading == false ?
                props.value.map((item, index) =>

                    <div className="row">
                        
                        <CardItemImageShow  image={ImageData[index]} /> 
                        
                    </div>

                    ) : <ScaleSpinner />
            }

        </>
    );
}

//<CardItemImageShow value={item} image={ImageData[index]} /> line:74