import React, { Fragment } from 'react'
import { Grid } from '@mui/material'
import CustomerListTable from './CustomerListTable'
import { Breadcrumb } from 'app/components'

const Customer = () => {

    return (
        <Fragment>
            <div className="m-sm-30">
            <div className="mb-sm-30">
                    <Breadcrumb
                        routeSegments={[
                            { name: 'Pages', path: '/Vendors' },
                            { name: 'Vendors' },
                        ]}
                    />
                </div>
            <div className="m-sm-30 mt-6">
                <Grid container spacing={3}>

                        {/* Top Selling Products */}
                        <CustomerListTable />

                    </Grid>
                    </div>
                    </div>
        </Fragment>
    )
}

export default Customer
