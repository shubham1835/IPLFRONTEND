import Loadable from 'app/components/Loadable';
import { lazy } from 'react';
import { authRoles } from '../../auth/authRoles';

const BidHistoryDashboard = Loadable(lazy(() => import('./BidHistory')));

const bidHistoryRoutes = [
  { path: '/bids', element: <BidHistoryDashboard />, auth: authRoles.admin },
];

export default bidHistoryRoutes;
