import React, { Fragment } from 'react'
import { Breadcrumb } from 'app/components'
import UpdateCustomerForm from './UpdateCustomerForm'

const UpdateCustomer = () => {
    return (
        <Fragment>
            <div className="m-sm-30">
                <div className="mb-sm-30">
                    <Breadcrumb
                        routeSegments={[
                            { name: 'Pages', path: '/dashboard' },
                            { name: 'Update Vendor' },
                        ]}
                    />
                </div>
                    <UpdateCustomerForm />
            </div>
        </Fragment>
    )
}

export default UpdateCustomer
