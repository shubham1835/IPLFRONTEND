import React from 'react'
import { authRoles } from '../../auth/authRoles'
import Loadable from 'app/components/Loadable';
import { lazy } from 'react';

const EmpList = Loadable(lazy(() => import('./employee-list/Employee')));

const NewEmp = Loadable(lazy(() => import('./new-employee/NewEmployee')));

const EmpQR = Loadable(lazy(() => import('./EmployeeAuthQR')));

const employeeRoutes = [
    {
        path: '/employee/employee-list',
        element: <EmpList/>,
        auth: authRoles.admin,
    },
    {
        path: '/employee/new-employee',
        element: <NewEmp/>,
        auth: authRoles.admin,
    },
    {
        path: '/employee/qr',
        element: <EmpQR/>,
        auth: authRoles.admin,
    }
]

export default employeeRoutes
