import React from 'react'
import { authRoles } from '../../auth/authRoles'
import Loadable from 'app/components/Loadable';

const CustList= Loadable(React.lazy(() => import('./customer-list/Customer')));
const NewCust= Loadable(React.lazy(() => import('./new-customer/NewCustomer')));
const UpdateCustomer= Loadable(React.lazy(() => import('./customer-update/UpdateCustomer')));
const customerRoutes = [
    {
        path: '/customer/customer-list',
        element: <CustList/>,
        auth: authRoles.admin,
    },
    {
        path: '/customer/new-customer',
        element: <NewCust/>,
        auth: authRoles.admin,
    },
    {
        path: '/customer/updateCustomer',
        element: <UpdateCustomer/>,
        auth: authRoles.admin,
    }
]

export default customerRoutes
