import { authRoles } from './auth/authRoles'

export const navigations = [
    {
        name: 'Dashboard',
        path: '/iplDashboard/default',
        icon: 'dashboard',
        auth: authRoles.editor
    },
    {
        name: 'My Bids',
        path: '/bids',
        icon: 'money',
        auth: authRoles.editor
    },
    {
        name: 'My Stats',
        path: '/aggregate',
        icon: 'equalizer',
        auth: authRoles.editor
    },
    {
        name: 'Create Subscription',
        path: '/createSubscription',
        icon: 'subscriptions',
        auth: authRoles.admin
    },
    {
        name: 'Add User',
        path: '/employee/new-employee',
        icon: 'personAdd',
        auth: authRoles.admin
    },
    {
        name: 'Change Pin',
        path: '/session/mpin-signup',
        icon: 'people',
        auth: authRoles.editor
    }
]
