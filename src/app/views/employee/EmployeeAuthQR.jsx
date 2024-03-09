import React, { Fragment } from 'react'
import { Grid } from '@mui/material'
import { Breadcrumb } from 'app/components'
import { useSelector } from 'react-redux'
import QRCode from "react-qr-code";

const Employee = () => {
    const qrData = useSelector((state) => state.userReducer.qrData);
    console.log('[qrData]' + qrData)
    return (
        <Fragment>
            <div className="m-sm-30">
                <div className="mb-sm-30">
                    <Breadcrumb
                        routeSegments={[
                            { name: 'Pages', path: '/' },
                            { name: 'Auth QR' },
                        ]}
                    />
                </div>
                <div className="m-sm-30 mt-6">
                    <Grid container spacing={3}>
                        <QRCode value={qrData} />
                    </Grid>
                </div>
            </div>
        </Fragment>
    )
}

export default Employee
