import React, { Fragment } from 'react'
import { Grid } from '@mui/material'
import { Breadcrumb } from 'app/components'
import ProductListTable from './ProductListTable'

const ProductList = () => {

    return (
        <Fragment>
            <div className="m-sm-30">
                <div className="mb-sm-30">
                    <Breadcrumb
                        routeSegments={[
                            { name: 'Pages', path: '/' },
                            { name: 'Product' },
                        ]}
                    />
                </div>
                <div className="m-sm-30 mt-6">
                    <Grid container spacing={3}>

                        {/* Top Selling Products */}
                        <ProductListTable />

                    </Grid>
                </div>
            </div>
        </Fragment>
    )
}

export default ProductList
