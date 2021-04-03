import React, { useEffect } from 'react'

import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';

import CssBaseline from '@material-ui/core/CssBaseline'
import EnhancedTable from './EnhancedTable'
import { toaster } from 'evergreen-ui'
//import { confirmWrapper, confirm } from './confirm'
import authService from '../../api-authorization/AuthorizeService'
//import { confirm } from "../ShowDialog/Confirmation";
import { Link } from 'react-router-dom';
import { confirm } from "../../ShowDialog/Confirmation";

import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css


var list_data = []

//{ list_data[cell.row.id] }
//onClick={() => UpdateRowId(cell)}

const TableList = (props) => {
    const columns = React.useMemo(
        () => [
            {
                Header: 'Id',
                accessor: 'id',
               
            },
            {
                Header: 'Title',
                accessor: 'title',
            },
            {
                Header: 'Quantity',
                accessor: 'quantity',
            },
            {
                Header: 'Update',
                accessor: 'update',
                Cell: ({ cell }) => (  

                
                    <Link to={{ pathname: `/update-product/${cell.row.values.id}`}} >
                        <button value={cell.row.values.id}  type="button"
                            className="btn btn-outline-success">UPDATE                     
                        </button>
                     </Link>
                    
                )
                
            },
            {
                Header: 'Delete',
                accessor: 'delete',
                Cell: ({ cell }) => (
                    <button type="button" onClick={() => handleOnClickDelete(cell)} className="btn btn-outline-danger">
                        DELETE
                    </button>
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
                            style={{marginLeft:'10px'}}
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
           
            console.log('LIST DATA INSIDE ', list_data[cell.row.id])

                const token = await authService.getAccessToken();
                console.log("Token Data here : " + token);
                
                fetch('Admin/DeleteProductId', {
                    method: 'POST', // or 'PUT'
                    headers: !token ? {} : {
                        'Content-Type': 'application/json; charset=utf-8', 'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({

                        'id': list_data[cell.row.id].id,

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

    
    //const [data, setData] = React.useState(React.useMemo(() => makeData([],true, 20), []))
    const [data, setData] = React.useState(React.useMemo(() => makeData([], true, 20), []))

    useEffect(() => {

        list_data = []
        if (props.data.isLoading === false && props.data.isLoading !== undefined) {

            props.data.data.map(item => {
                var temp = {
                    id: item.id,
                    title: item.title,
                    quantity: item.quantity,
                    
                 

                }
                list_data.push(temp)
                

            })
           
        }

        setData(makeData(list_data, false, 20))

       
    }, [props.data]);


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
        console.log('Data is now comming', { list_data })

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
        id:temp.id,
        title: temp.title ,
        quantity: temp.quantity,
       
        
           
    }
} 

const newPerson2 = (temp) => {

    return {
        id: 0,
        title: 'null',
        quantity: 0,
        update: '<div><button type="button" className="btn btn-primary"> Primary</button ></div>'

    }
} 


