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
                Header: 'POST ID',
                accessor: 'postId',

            },
 {
                Header: 'POST DATE',
                accessor: 'dateTime',
                 Cell: ({ cell }) => (
                    <div> <Demo value={ cell.row.values.dateTime}/> </div>              
                )
                
                
            },
            {
                Header: 'USER',
                accessor: 'userName',
                


            },
           
            {
                Header: 'STATUS',
                accessor: 'approved',
                Cell: ({ cell }) => (
                    <Fab onClick={() => handleOnClickApproved(cell)} variant="extended" color="secondary" aria-label="add">
                        <PostAddIcon />
                     {cell.row.values.approved}
                    </Fab>
                )
            },
            
            
            {
                Header: 'Details',
                accessor: 'Details',
               Cell: ({ cell }) => (    
                     
                    <><FullScreenDrawer data={props.data[cell.row.index]}  /> </>                  
                )
                
            },
            {
                Header: 'DELETE',
                accessor: 'delete',
                Cell: ({ cell }) => (
                    <Fab onClick={() => handleOnClickDelete(cell)} variant="extended" color="secondary" aria-label="add">
                        <DeleteIcon />
                       DELETE
                    </Fab>
                )
               
            },
        ],
        []
    )


    async function handleOnClickApproved(cell) {

        console.log('LIST DATA handleOnClickApproved ', list_data[cell.row.id])
        console.log('APPROVAL  ', list_data[cell.row.id].approved)
       

        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <div className='custom-ui'>
                        <h1>Are you sure?</h1>
                        <p>Do want to  changed {list_data[cell.row.id].approved} on this Post ?</p>

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

                                Approved(cell);

                            }}
                        >
                            CHANGED
                         </Button>

                    </div>
                );
            }
        });

    }


  
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


        if (list_data[cell.row.id]) {

          
            const token = await authService.getAccessToken();
            console.log("Token Data here : " + token);

            fetch('Post/DeletPost', {
                method: 'POST', // or 'PUT'
                headers: !token ? {} : {
                    'Content-Type': 'application/json; charset=utf-8', 'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({

                    'PostId': list_data[cell.row.id].postId,

                }),
            })
                .then(response => response.json())
                .then(Response => {
                    toaster.success(
                        '' + Response.status
                    )
                    console.log('Success:', Response);

                })
                .catch((error) => {

                    console.error('Error:', error);
                    toaster.danger(
                        'Something went wrong trying to create your audience'
                    )
                });




            //Delet_request(list_data[cell.row.id].id)
        } else {
            //No
        }


    };


    const Approved = async (cell) => {


        if (list_data[cell.row.id]) {

            console.log('LIST DATA INSIDE post id ', list_data[cell.row.id].postId)

            const token = await authService.getAccessToken();
           

            fetch('Post/ChangePostApproval', {
                method: 'POST', // or 'PUT'
                headers: !token ? {} : {
                    'Content-Type': 'application/json; charset=utf-8', 'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({

                    'PostId': list_data[cell.row.id].postId,

                }),
            })
                .then(response => response.json())
                .then(Response => {
                    toaster.success(
                        '' + Response.status
                    )
                    console.log('Success:', Response);

                })
                .catch((error) => {

                    console.error('Error:', error);
                    toaster.danger(
                        'Something went wrong trying to create your audience'
                    )
                });

              


            //Delet_request(list_data[cell.row.id].id)
        } else {
            //No
        }


    };
   
   
    const [data, setData] = React.useState(React.useMemo(() => makeData([], true, 20), []))

    useEffect(() => {

         list_data = []
        
        console.log('PROPS DATA  for date ', props.data)
        props.data.map(item => {

            
          
            
          var temp = {

                    postId: item.postId,
                    userName: item.client.userName,                
                    approved: item.approved,
                    dateTime : item.dateTime                 
                    
                }
                list_data.push(temp)


            })
       
        console.log('list data date time ', {list_data})
        

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

        postId: temp.postId,
        userName: temp.userName,                
        approved: temp.approved,
        dateTime : temp.dateTime 
        
           
    }
} 

const newPerson2 = (temp) => {

    return {

       postId: '',
       userName: '',                
       approved: '',
       dateTime : ''      
        

    }
} 


