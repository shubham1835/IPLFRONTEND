import useAuth from 'app/hooks/useAuth';
// import { flat } from 'app/utils/utils';
import { Navigate, useLocation } from 'react-router-dom';
// import AllPages from '../routes';

// const userHasPermission = (pathname, user, routes) => {
//   if (!user) {
//     return false;
//   }
//   const matched = routes.find((r) => r.path === pathname);

//   const authenticated =
//     matched && matched.auth && matched.auth.length ? matched.auth.includes(user.role) : true;
//   return authenticated;
// };

const AuthGuard = ({ children }) => {
  let {
    isAuthenticated,
    // user
  } = useAuth();
  const { pathname } = useLocation();

  //   const routes = flat(AllPages);

  //   const hasPermission = userHasPermission(pathname, user, routes);
  //   let authenticated = isAuthenticated && hasPermission;

  // // IF YOU NEED ROLE BASED AUTHENTICATION,
  // // UNCOMMENT ABOVE LINES
  // // AND COMMENT OUT BELOW authenticated VARIABLE

  let authenticated = isAuthenticated;
  const navigate = () => {
    if (window.localStorage.getItem('isMpinLoginEnabled'))
      return <Navigate replace to="/session/otp-login" state={{ from: pathname }} />
    else return <Navigate replace to="/session/signin" state={{ from: pathname }} />
  }
  return (
    <>
      {authenticated ? (
        children
      ) : (
        navigate()
      )}
    </>
  );
};

export default AuthGuard;
