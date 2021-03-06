import React, { useEffect } from 'react'
import namor from 'namor'
import CssBaseline from '@material-ui/core/CssBaseline'
import EnhancedTable from './EnhancedTable'
//import makeData from './makeData'


const TableList = (props) => {
    const columns = React.useMemo(
        () => [
            {
                Header: 'First Name',
                accessor: 'firstName',
            },
            {
                Header: 'Last Name',
                accessor: 'lastName',
            },
            {
                Header: 'Age',
                accessor: 'age',
            },
            {
                Header: 'Visits',
                accessor: 'visits',
            },
            {
                Header: 'Status',
                accessor: 'status',
            },
            {
                Header: 'Profile Progress',
                accessor: 'progress',
            },
        ],
        []
    )

  
   
    
    console.log('props loading ', props.data.isLoading);
    
    //const [data, setData] = React.useState(React.useMemo(() => makeData([],true, 20), []))
    const [data, setData] = React.useState(React.useMemo(() => makeData([], true, 20), []))

    useEffect(() => {

        var list_data = []
        if (props.data.isLoading === false && props.data.isLoading !== undefined) {

            props.data.data.map(item => {
                var temp = { title: item.title, id: item.id }
                list_data.push(temp)
                console.log('List outside makeData ', temp)

            })
           
        }

        setData(makeData(list_data, false, 20))

       // setBoards(response);
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



    //console.log('makeData data all json format is ', JSON.stringify(list_data));
   // var newPerson=[]
   // if (list_data.isLoading === false && list_data.isLoading !== undefined) {

      //  console.log('makeData data all json format is ', JSON.stringify(list_data.data));

      
               
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

    //console.log('d from makeData pass to newPerson is ', JSON.stringify(list));
    return {
        firstName:temp.title,
        lastName: temp.title ,
        age: 2,
        visits: temp.title,
        progress: temp.title ,
        status:'single'
           
    }
} 

const newPerson2 = (temp) => {

    return {
        firstName: 'null',
        lastName: 'null',
        age: 0,
        visits: 'null',
        progress: 'null',
        status: 'null'

    }
} 


