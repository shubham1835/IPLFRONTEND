import Loadable from 'app/components/Loadable';
import { lazy } from 'react';
import { authRoles } from '../../auth/authRoles';

const IplDashboard = Loadable(lazy(() => import('./IplDashboard')));

const iplDashboardRoutes = [
  { path: '/iplDashboard/default', element: <IplDashboard />, auth: authRoles.admin },
];

export default iplDashboardRoutes;
