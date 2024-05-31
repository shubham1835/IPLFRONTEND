import Loadable from 'app/components/Loadable';
import { lazy } from 'react';
import { authRoles } from '../../auth/authRoles';

const AddSubscriptionDashboard = Loadable(lazy(() => import('./AddSubscription')));

const addSubscRoutes = [
    { path: '/createSubscription', element: <AddSubscriptionDashboard />, auth: authRoles.editor }
];

export default addSubscRoutes;
