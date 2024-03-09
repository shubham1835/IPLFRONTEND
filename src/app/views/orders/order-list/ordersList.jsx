import React, { Fragment } from 'react'
import { Grid } from '@mui/material'
// import CustomerListTable from './CustomerListTable'
import { Breadcrumb } from 'app/components'
import OrderListTable from './orderListTable'

const OrderList = () => {

    return (
        <Fragment>
            <div className="m-sm-30">
            <div className="mb-sm-30">
                    <Breadcrumb
                        routeSegments={[
                            { name: 'Pages', path: '/Order' },
                            { name: 'Orders' },
                        ]}
                    />
                </div>
            <div className="m-sm-30 mt-6">
                <Grid container spacing={3}>

                        {/* Top Selling Products */}
                        <OrderListTable />

                    </Grid>
                    </div>
                    </div>
        </Fragment>
    )
}

export default OrderList
