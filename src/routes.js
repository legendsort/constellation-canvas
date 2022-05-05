import { Suspense, useMemo } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import Layout from './components/Layout';

import { useSelector } from 'react-redux';
import { ROUTES, LINKS, USER_ROLES } from 'utils/constants';
import { AuthGuard } from 'hocs';

const Routes = () => {
  const profile = useSelector((state) => state.auth.profile);
  const { role: userRole, name: userName } = profile;
  const validatedRoutes = useMemo(() => ROUTES.filter((r) => r.validate(profile)), [profile]);

  const redirectTo = useMemo(() => {
    if (userRole !== USER_ROLES.unknown && !userName) {
      return LINKS.screenName;
    }

    switch (userRole) {
      case USER_ROLES.unknown:
        return LINKS.register;
      case USER_ROLES.admin:
      case USER_ROLES.facilitator:
        return LINKS.userManagement;
      case USER_ROLES.user:
        return LINKS.board;
      default:
        return LINKS.root;
    }
  }, [userRole, userName]);

  return (
    <Suspense fallback={<div />}>
      <Switch>
        {validatedRoutes.map(({ path, settings, authRequired, component: Component }) => (
          <Route
            key={path}
            path={path}
            render={(props) =>
              authRequired ? (
                <AuthGuard>
                  <Layout {...settings}>
                    <Component {...props} />
                  </Layout>
                </AuthGuard>
              ) : (
                <Layout {...settings}>
                  <Component {...props} />
                </Layout>
              )
            }
          />
        ))}
        <Redirect to={redirectTo} />
      </Switch>
    </Suspense>
  );
};

export default Routes;
