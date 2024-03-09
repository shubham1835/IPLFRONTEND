import React from 'react'
import { authRoles } from '../../auth/authRoles'

const orderRoutes = [
    {
        path: '/order/order-list',
        component: React.lazy(() => import('./order-list/ordersList'))
    }
]

export default orderRoutes
