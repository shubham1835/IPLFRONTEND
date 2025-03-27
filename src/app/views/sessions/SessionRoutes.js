import Loadable from 'app/components/Loadable';
import { lazy } from 'react';

const NotFound = Loadable(lazy(() => import('./NotFound')));
const ForgotPassword = Loadable(lazy(() => import('./ForgotPassword')));
const CreatePassword = Loadable(lazy(() => import('./CreatePassword')));
const JwtLogin = Loadable(lazy(() => import('./JwtLogin')));
const JwtRegister = Loadable(lazy(() => import('./JwtRegister')));
const MpinLogin = Loadable(lazy(() => import('./MpinLogin')));
const MpinRegister = Loadable(lazy(() => import('./RegisterMpin')));

const sessionRoutes = [
  { path: '/session/mpin-signup', element: <MpinRegister /> },
  { path: '/session/signup', element: <JwtRegister /> },
  { path: '/session/signin', element: <JwtLogin /> },
  { path: '/session/otp-login', element: <MpinLogin /> },
  { path: '/session/forgot-password', element: <ForgotPassword /> },
  { path: '/session/reset-password', element: <CreatePassword /> },
  { path: '/session/404', element: <NotFound /> },
];

export default sessionRoutes;
