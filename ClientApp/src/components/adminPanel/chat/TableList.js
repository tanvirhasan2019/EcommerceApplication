import React, { useEffect, useState} from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import EnhancedTable from './EnhancedTable'
import { toaster } from 'evergreen-ui'
import { confirmAlert } from 'react-confirm-alert';
import authService from '../../api-authorization/AuthorizeService';
import { Link } from 'react-router-dom';
//import Demo from '../DateTimeComponent/Demo';
import { confirm } from '../../ShowDialog/Confirmation';
import { DrawerItem } from './DrawerItem';
import  FullScreenDrawer  from './FullScreenDrawer';
import ChatOnline from './ChatOnline';

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
    const [chatopen, setChatopen] = useState(false) 
    const [chatData, setChatData] = useState([]) 

    const columns = React.useMemo(
        () => [
            {
                Header: 'CHAT ID',
                accessor: 'chatid',

            },
            {
                Header: 'USER NAME',
                accessor: 'username',
                


            },
            {
                Header: 'LAST MESSAGE',
                accessor: 'lastmessage',



            },
            
            {
                Header: 'CHAT NOW',
                accessor: 'chat',
                Cell: ({ cell }) => (
                    <Fab onClick={() => handleOnClickChatNow(cell)} variant="extended" color="secondary" aria-label="add">
                        <PostAddIcon />
                         CHAT NOW
                    </Fab>
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


    function handleOnClickChatNow(cell) {

        //console.log('Chat Now Button pressed ', cell)
        console.log('LIST DATA Button pressed ', list_data[cell.row.id])
        setChatData(list_data[cell.row.id])
        setChatopen(true)
       

        console.log('ChatBox ', chatopen);



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
       
           
        props.data.map(item => {

            console.log('Chat id ', item.chatTableId)
            var size = item.messages.length ? item.messages.length : -1 ;
            var lastMessage = "No last Message"
            if(size != -1 && size != 0 ){
                 lastMessage = item.messages[size-1].messages
            }

            
            var temp = {

                    chatid : item.chatTableId,
                    lastmessage: lastMessage,  
                    username: item.user.userName,
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

    const handleCloseChat = () => {

        console.log('closed chat box  click')
        setChatopen(false)
        console.log('ChatBox ', chatopen);
    }

    return (
    <>
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
            {chatopen ? <ChatOnline data={chatData} handleCloseChat={handleCloseChat} /> : null } 
    </>
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

      
        chatid : temp.chatid,
        lastmessage: temp.lastmessage,    
        username: temp.username
        
           
    }
} 

const newPerson2 = (temp) => {

    return {

      chatid : '',
      lastmessage: '', 
      username: ''
        

    }
} 


