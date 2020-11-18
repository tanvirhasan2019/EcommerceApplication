import React from 'react'
import { Pagination } from 'semantic-ui-react'

const PaginationExampleCompact = () => (

    <div className="container-fluid">
        <div className="d-flex flex-row-reverse">
        <Pagination
                boundaryRange={0}
                defaultActivePage={1}
                ellipsisItem={null}
                firstItem={null}
                lastItem={null}
                siblingRange={1}
                totalPages={100}
                style={{height:'40px' }}
        />
        </div>
        </div>
)

export default PaginationExampleCompact;