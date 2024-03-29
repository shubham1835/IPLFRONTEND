import { authRoles } from './auth/authRoles'

export const navigations = [
    {
        name: 'Dashboard',
        path: '/iplDashboard/default',
        icon: 'dashboard',
        auth: authRoles.admin
    },
    {
        name: 'My Bids',
        path: '/bids',
        icon: 'money',
        auth: authRoles.admin
    },
    {
        name: 'My Stats',
        path: '/aggregate',
        icon: 'equalizer',
        auth: authRoles.admin
    }
]
