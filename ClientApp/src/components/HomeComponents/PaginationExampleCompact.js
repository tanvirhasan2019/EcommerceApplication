import React from 'react'
import { Pagination } from 'semantic-ui-react'

function PaginationExampleCompact(props){

   // const [activePage, setActivePage] = React.useState(1);

   /* const handlePaginationChange = (e, { activePage }) => {
        setActivePage(activePage)
        console.log("PAGE CLICKED " + JSON.stringify(activePage))
    } */

    const empty = <h2>No product found</h2>;

    return (
    <div className="container-fluid">
        <div className="d-flex flex-row justify-content-center">
                {
                     <Pagination
                        boundaryRange={0}
                        activePage={props.activePagehandle}
                        ellipsisItem={null}
                        firstItem={null}
                        lastItem={null}
                        siblingRange={1}
                        totalPages={props.onChange}
                        style={{ height: '40px' }}
                        onPageChange={props.handlePaginationChange}
                    />
                }
        </div>
    </div>
);
}

export default PaginationExampleCompact;

//defaultActivePage = { 1}