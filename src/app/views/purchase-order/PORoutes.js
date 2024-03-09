import React from 'react'
import { authRoles } from '../../auth/authRoles'
const poRoutes = [
    {
        path: '/po/poform',
        component: React.lazy(() => import('./po-form/POForm')),
        auth: authRoles.admin,
    },
    {
        path: '/po/poformat',
        component: React.lazy(() => import('./po-form/POFormat')),
        auth: authRoles.admin,
    },
    {
        path: '/po/polist',
        component: React.lazy(() => import('./po-list/POList')),
        auth: authRoles.admin,
    }
]

export default poRoutes
