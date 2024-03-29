import Loadable from 'app/components/Loadable';
import { lazy } from 'react';
import { authRoles } from '../../auth/authRoles';

const AggregateDashboard = Loadable(lazy(() => import('./AggregateDashboard')));

const aggregateRoutes = [
  { path: '/aggregate', element: <AggregateDashboard />, auth: authRoles.admin },
];

export default aggregateRoutes;
