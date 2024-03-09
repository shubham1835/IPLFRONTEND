import React, { Fragment } from 'react'
import { Grid } from '@mui/material'
import { Breadcrumb } from 'app/components'
import InvoiceListTable from './InvoiceListTable'

const InvoiceList = () => {

    return (
        <Fragment>
            <div className="m-sm-30">
                <div className="mb-sm-30">
                    <Breadcrumb
                        routeSegments={[
                            { name: 'Pages', path: '/' },
                            { name: 'Invoice' },
                        ]}
                    />
                </div>
                <div className="m-sm-30 mt-6">
                    <Grid container spacing={3}>

                        {/* Top Selling Products */}
                        <InvoiceListTable />

                    </Grid>
                </div>
            </div>
        </Fragment>
    )
}

export default InvoiceList
