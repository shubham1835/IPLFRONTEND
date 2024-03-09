import React, { Fragment } from 'react'
import { Breadcrumb } from 'app/components'
import EmployeeForm from './EmployeeForm'

const NewEmployee = () => {
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
                    <EmployeeForm />
            </div>
        </Fragment>
    )
}

export default NewEmployee
