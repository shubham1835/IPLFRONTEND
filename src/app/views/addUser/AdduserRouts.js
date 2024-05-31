import Loadable from 'app/components/Loadable';
import { lazy } from 'react';
import { authRoles } from '../../auth/authRoles';

const AddUserDashboard = Loadable(lazy(() => import('./AddUser')));

const AddUserRoutes = [
  { path: '/addUser', element: <AddUserDashboard />, auth: authRoles.admin },
];

export default AddUserRoutes;
