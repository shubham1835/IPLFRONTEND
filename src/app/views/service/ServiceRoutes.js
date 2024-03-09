import React from 'react'
import { authRoles } from '../../auth/authRoles'
import Loadable from 'app/components/Loadable';
const AddService = Loadable(React.lazy(() => import('./add-service/AddService')));
const serviceRoutes = [
    {
        path: '/service/addService',
        element: <AddService />,
        auth: authRoles.admin,
    }
]

export default serviceRoutes
