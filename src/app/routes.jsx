import AuthGuard from 'app/auth/AuthGuard';
import chartsRoute from 'app/views/charts/ChartsRoute';
import dashboardRoutes from 'app/views/dashboard/DashboardRoutes';
import materialRoutes from 'app/views/material-kit/MaterialRoutes';
import NotFound from 'app/views/sessions/NotFound';
import sessionRoutes from 'app/views/sessions/SessionRoutes';
import { Navigate } from 'react-router-dom';
import MatxLayout from './components/MatxLayout/MatxLayout';
import employeeRoutes from './views/employee/EmployeeRoutes'
import customerRoutes from './views/customers/CustomerRoutes';
import productRoutes from './views/product/ProductRoutes';
import serviceRoutes from './views/service/ServiceRoutes';
import iplDashboardRoutes from './views/iplDashboard/IplDashboardRoutes';
import bidHistoryRoutes from './views/bidHistory/BidHistoryRouts';
import aggregateRoutes from './views/BidStats/AggregateRouts';
import addSubscRoutes from './views/addSubscription/AddSubscriptionRoutes';
import AddUserRoutes from './views/addUser/AdduserRouts';

const routes = [
  {
    element: (
      <AuthGuard>
        <MatxLayout />
      </AuthGuard>
    ),
    children: [...dashboardRoutes, ...chartsRoute, ...materialRoutes, ...employeeRoutes, ...customerRoutes, ...productRoutes, ...serviceRoutes, ...iplDashboardRoutes, ...bidHistoryRoutes, ...aggregateRoutes, ...addSubscRoutes, ...AddUserRoutes],
  },
  ...sessionRoutes,
  { path: '/', element: <Navigate to="iplDashboard/default" /> },
  { path: '*', element: <NotFound /> },
];

export default routes;
