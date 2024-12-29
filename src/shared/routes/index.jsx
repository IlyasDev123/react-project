import { Navigate, Route, Routes } from 'react-router-dom';
import { privateRoute, publicRoute } from './allRoutes';
import { useSelector } from 'react-redux';
import Layout from './layout';
import ProtectedLayout from './protectedLayout';
import { routeConstant } from './routeConstants';

function Index() {
  const { user } = useSelector((state) => state.root);
  const isLoggedIn = user?.isLoggedIn;
  const routesToRender = isLoggedIn ? privateRoute : publicRoute;

  return (
    <Routes>
      {routesToRender.map((route, index) => (
        <Route
          key={index}
          path={route.path}
          element={
            isLoggedIn ? (
              <ProtectedLayout
                {...route}
                isProtectedRoute={isLoggedIn}
                title={route.title}
              />
            ) : (
              <Layout
                {...route}
                isProtectedRoute={isLoggedIn}
                title={route.title}
              />
            )
          }
        />
      ))}
      {isLoggedIn ? (
        <Route
          path="*"
          element={<Navigate to={routeConstant.dashboard.path} />}
        />
      ) : (
        <Route path="*" element={<Navigate to={routeConstant.login.path} />} />
      )}
    </Routes>
  );
}

export default Index;
