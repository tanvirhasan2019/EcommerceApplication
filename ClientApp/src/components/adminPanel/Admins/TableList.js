import React, { useEffect } from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import EnhancedTable from './EnhancedTable'
import { toaster } from 'evergreen-ui'
import { confirmAlert } from 'react-confirm-alert';

import authService from '../../api-authorization/AuthorizeService'
import { Link } from 'react-router-dom';
//import Demo from '../DateTimeComponent/Demo';
import { confirm } from '../../ShowDialog/Confirmation';
import { DrawerItem } from './DrawerItem';
import  FullScreenDrawer  from './FullScreenDrawer';

import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';

import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import Icon from '@material-ui/core/Icon';
import DeleteIcon from '@material-ui/icons/Delete';
import PostAddIcon from '@material-ui/icons/PostAdd';
import { Typography } from '@material-ui/core';
import EmailIcon from '@material-ui/icons/Email';

import Blushing from '../../../images/blushing.gif'
import Mail from '../../../images/gmail.gif'
import Phone from '../../../images/phone-ringing.gif'


//import Demo from '../DateTimeComponent/Demo';
import Demo from '../customize_product/DateTimeComponent/Demo';


const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    extendedIcon: {
        marginRight: theme.spacing(1),
    },
}));


var list_data = []


const TableList = (props) => {

    const classes = useStyles();

    const columns = React.useMemo(
        () => [
            {

                Header: () => <Typography component="h5" variant="h5">
                               <img src={Blushing} width="25" height="25" />
                               &nbsp; USER ID
                             </Typography>,
                accessor: 'userid', 
              
            },
            

            {
                Header: () => <Typography component="h5" variant="h5">
                              <img  src={Mail} width="25" height="25" />
                               &nbsp; EMAIL
                             </Typography>,
                accessor: 'useremail',
                Cell: ({ cell }) => (

                    <Fab  variant="extended" color="secondary" >

                        <Typography style={{ color: 'white', textTransform: 'none' }} variant="body1">                          
                            {cell.row.values.useremail}
                         </Typography>
                                                              
                    </Fab>

                    
                )

            },


            {
                Header: () => <Typography component="h5" variant="h5">
                               <img  src={Phone} width="25" height="25" />
                               &nbsp; PHONE
                             </Typography>,
                accessor: 'phonenumber',

            },
            
                    
            
            {
                Header: <Typography component="h5" variant="h5">
                          DETAILS
                         </Typography>,
               accessor: 'Details',
               Cell: ({ cell }) => (    
                     
                    <><FullScreenDrawer data={props.data[cell.row.index]}  /> </>                  
                )
                
            },
            {
                Header: <Typography component="h5" variant="h5">
                            DELETE
                         </Typography>,
                accessor: 'delete',
                Cell: ({ cell }) => (
                    <Fab onClick={() => handleOnClickDelete(cell)} variant="extended" color="secondary" aria-label="add">
                        <DeleteIcon />                    
                    </Fab>
                )
               
            },
        ],

        []
    )


  
  
    async function handleOnClickDelete(cell) {

        console.log('LIST DATA INSIDE ', list_data[cell.row.id])

        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <div className='custom-ui'>
                        <h1>Are you sure?</h1>
                        <p>Do  want to delete this product?</p>

                        <Button
                            variant="contained"
                            color="primary"
                            onClick={onClose}
                        >
                            CANCEL
                       </Button>

                        <Button
                            variant="contained"
                            color="secondary"
                            startIcon={<DeleteIcon />}
                            style={{ marginLeft: '10px' }}
                            onClick={() => {

                                onClose();

                                // DELETE  REQUEST HERE 

                                DeleteRowId(cell);

                            }}
                        >
                            Delete
                         </Button>

                    </div>
                );
            }
        });

    }



    const DeleteRowId = async (cell) => {


        

          
            const token = await authService.getAccessToken();
        console.log("Token Data here : " + token);
        if (token) {
        

            fetch('Admin/DeleteUser', {
                method: 'DELETE', // or 'PUT'
                headers: !token ? {} : {
                    'Content-Type': 'application/json; charset=utf-8', 'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({

                    'userid': list_data[cell.row.id].userid,

                }),
            })
                .then(response => response.json())
                .then(Response => {
                   
                    if (Response.statusCode == 200) {

                        toaster.success(
                            '' + Response.status
                        )
                        const newItem = list_data.filter(item => item.userid != list_data[cell.row.id].userid)                   
                        setData(newItem)
                    }
                    console.log('Success:', Response);

                })
                .catch((error) => {

                    console.error('Error:', error);
                    toaster.danger(
                        'Something went wrong trying to create your audience'
                    )
                });




            
        } else {
            toaster.danger(
                'INVALID CREDENTIALS'
            )
        }


    };


  
   
    const [data, setData] = React.useState(React.useMemo(() => makeData([], true, 20), []))

    useEffect(() => {

         list_data = []
        
        console.log('TABLE LIST ', props.data)
        props.data.map(item => {

               
            var phone = item.phoneNumber ? item.phoneNumber : 'Empty'
            var temp = {

                    userid: item.id,
                    useremail: item.email,                
                    phonenumber: phone,
                    data : item              
                    
                }
                list_data.push(temp)


            })
       
        console.log('list data')
        console.log({list_data})

        setData(makeData(list_data, false, 20))


    }, []);


    const [skipPageReset, setSkipPageReset] = React.useState(false)

   
    const updateMyData = (rowIndex, columnId, value) => {
       
        setSkipPageReset(true)
        setData(old =>
            old.map((row, index) => {
                if (index === rowIndex) {
                    return {
                        ...old[rowIndex],
                        [columnId]: value,
                    }
                }
                return row
            })
        )
    }

    return (
        <div>
            <CssBaseline />
            <EnhancedTable
                columns={columns}
                data={data}
                setData={setData}
                updateMyData={updateMyData}
                skipPageReset={skipPageReset}
            />
        </div>
    )
}

export default TableList


function makeData(list_data, loading, ...lens) {

    if (loading == false) {
        console.log('Data is now comming', list_data)

        const makeDataLevel = (depth = 0) => {
            return range(list_data.length).map(d => {
                return {
                    ...newPerson(list_data[d]),
                    subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined,

                }
            })

        }
        return makeDataLevel()

    } else {

        const makeDataLevel = (depth = 0) => {
            return range(0).map(d => {
                return {
                    ...newPerson2([]),
                    subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined,

                }
            })

        }
        return makeDataLevel()
    }   
               
 }


const range = len => {
    const arr = []
    for (let i = 0; i < len; i++) {
        arr.push(i)
        console.log('Array i is ', i)
    }
    return arr
   
}

const newPerson = (temp) => {

   
    
    return {

        userid: temp.userid,
        useremail: temp.useremail,
        phonenumber: temp.phonenumber
       // data: temp   
        
           
    }
} 

const newPerson2 = (temp) => {

    return {

        userid: '',
        useremail: '',
        phonenumber: ''
     //   data: ''      
        

    }
} 


