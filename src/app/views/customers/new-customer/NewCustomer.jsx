import React, { Fragment } from 'react'
import { Breadcrumb } from 'app/components'
import CustomerForm from './CustomerForm'

const NewCustomer = () => {
    return (
        <Fragment>
            <div className="m-sm-30">
                <div className="mb-sm-30">
                    <Breadcrumb
                        routeSegments={[
                            { name: 'Pages', path: '/dashboard' },
                            { name: 'New Vendor' },
                        ]}
                    />
                </div>
                    <CustomerForm />
            </div>
        </Fragment>
    )
}

export default NewCustomer
